-- RARE GEMS JEWELRY - DATABASE UPDATE SCHEMA
-- Run this if you already have existing tables
-- This will add new fields and tables without errors

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add new fields to products table (if they don't exist)
DO $$
BEGIN
    -- Add SKU column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='products' AND column_name='sku') THEN
        ALTER TABLE products ADD COLUMN sku VARCHAR(100) UNIQUE;
    END IF;

    -- Add weight column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='products' AND column_name='weight') THEN
        ALTER TABLE products ADD COLUMN weight DECIMAL(10, 2);
    END IF;

    -- Add dimensions column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='products' AND column_name='dimensions') THEN
        ALTER TABLE products ADD COLUMN dimensions VARCHAR(100);
    END IF;

    -- Add cost_price column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='products' AND column_name='cost_price') THEN
        ALTER TABLE products ADD COLUMN cost_price DECIMAL(10, 2);
    END IF;

    -- Add archived column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='products' AND column_name='archived') THEN
        ALTER TABLE products ADD COLUMN archived BOOLEAN DEFAULT FALSE;
    END IF;

    -- Add SEO fields
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='products' AND column_name='seo_title') THEN
        ALTER TABLE products ADD COLUMN seo_title VARCHAR(255);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='products' AND column_name='seo_description') THEN
        ALTER TABLE products ADD COLUMN seo_description TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='products' AND column_name='url_slug') THEN
        ALTER TABLE products ADD COLUMN url_slug VARCHAR(255);
    END IF;
END $$;

-- Add new fields to orders table (if they don't exist)
DO $$
BEGIN
    -- Add payment_status column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='orders' AND column_name='payment_status') THEN
        ALTER TABLE orders ADD COLUMN payment_status VARCHAR(50) DEFAULT 'pending'
            CHECK (payment_status IN ('pending', 'paid', 'refunded', 'partial_refund'));
    END IF;

    -- Add payment_method column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='orders' AND column_name='payment_method') THEN
        ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50);
    END IF;

    -- Add tracking_number column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='orders' AND column_name='tracking_number') THEN
        ALTER TABLE orders ADD COLUMN tracking_number VARCHAR(255);
    END IF;

    -- Add refund_amount column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='orders' AND column_name='refund_amount') THEN
        ALTER TABLE orders ADD COLUMN refund_amount DECIMAL(10, 2) DEFAULT 0;
    END IF;

    -- Add notes column
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name='orders' AND column_name='notes') THEN
        ALTER TABLE orders ADD COLUMN notes TEXT;
    END IF;
END $$;

-- Stock History Table
CREATE TABLE IF NOT EXISTS stock_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    previous_stock INT NOT NULL,
    new_stock INT NOT NULL,
    change_amount INT NOT NULL,
    change_reason VARCHAR(255),
    changed_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Price History Table
CREATE TABLE IF NOT EXISTS price_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    previous_price DECIMAL(10, 2) NOT NULL,
    new_price DECIMAL(10, 2) NOT NULL,
    changed_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    description TEXT,
    expense_date DATE NOT NULL,
    created_by VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Customer Analytics Table
CREATE TABLE IF NOT EXISTS customer_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_email VARCHAR(255) UNIQUE NOT NULL,
    customer_name VARCHAR(255),
    total_orders INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    last_purchase_date TIMESTAMP WITH TIME ZONE,
    customer_segment VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order Notes Table
CREATE TABLE IF NOT EXISTS order_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    note TEXT NOT NULL,
    created_by VARCHAR(255),
    is_internal BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings Table
CREATE TABLE IF NOT EXISTS store_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(255) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes (only if they don't exist)
CREATE INDEX IF NOT EXISTS idx_stock_history_product ON stock_history(product_id);
CREATE INDEX IF NOT EXISTS idx_price_history_product ON price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(expense_date);
CREATE INDEX IF NOT EXISTS idx_customer_analytics_email ON customer_analytics(customer_email);
CREATE INDEX IF NOT EXISTS idx_order_notes_order ON order_notes(order_id);

-- Create or replace updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to customer_analytics (drop first if exists)
DROP TRIGGER IF EXISTS update_customer_analytics_updated_at ON customer_analytics;
CREATE TRIGGER update_customer_analytics_updated_at
    BEFORE UPDATE ON customer_analytics
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create view for dashboard statistics
CREATE OR REPLACE VIEW dashboard_stats AS
SELECT
    (SELECT COUNT(*) FROM orders WHERE DATE(created_at) = CURRENT_DATE) as today_orders,
    (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE DATE(created_at) = CURRENT_DATE) as today_revenue,
    (SELECT COUNT(*) FROM orders WHERE status = 'pending') as pending_orders,
    (SELECT COUNT(*) FROM products WHERE stock < 10 AND stock > 0) as low_stock_count,
    (SELECT COUNT(*) FROM products WHERE stock = 0) as out_of_stock_count,
    (SELECT COUNT(*) FROM orders) as total_orders,
    (SELECT COALESCE(SUM(total_amount), 0) FROM orders WHERE status != 'cancelled') as total_revenue;

-- Create view for best selling products
CREATE OR REPLACE VIEW best_selling_products AS
SELECT
    p.id,
    p.name,
    p.price,
    p.images,
    COUNT(DISTINCT o.id) as order_count,
    COALESCE(SUM((item_data->>'quantity')::int), 0) as total_sold
FROM products p
LEFT JOIN orders o ON o.status != 'cancelled'
LEFT JOIN LATERAL jsonb_array_elements(o.items) AS item_data ON (item_data->>'product_id')::text = p.id::text
GROUP BY p.id, p.name, p.price, p.images
ORDER BY total_sold DESC
LIMIT 10;

-- Insert default store settings (only if they don't exist)
INSERT INTO store_settings (setting_key, setting_value) VALUES
('store_name', '"Rare Gems Jewelry"'),
('store_email', '"contact@raregems.com"'),
('store_phone', '"+1 234 567 8900"'),
('currency', '"USD"'),
('tax_rate', '0.08'),
('low_stock_threshold', '10')
ON CONFLICT (setting_key) DO NOTHING;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Database schema updated successfully!';
END $$;
