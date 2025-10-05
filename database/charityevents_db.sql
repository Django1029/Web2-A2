-- 创建数据库
CREATE DATABASE IF NOT EXISTS charityevents_db;
USE charityevents_db;

-- 1. 活动类别表
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- 2. 机构表
CREATE TABLE organisations (
    org_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    contact_info VARCHAR(255)
);

-- 3. 活动表
CREATE TABLE events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    location VARCHAR(150),
    category_id INT,
    org_id INT,
    ticket_price DECIMAL(10,2) DEFAULT 0.00,
    status ENUM('upcoming', 'past', 'suspended') DEFAULT 'upcoming',
    goal_amount DECIMAL(10,2),
    raised_amount DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (category_id) REFERENCES categories(category_id),
    FOREIGN KEY (org_id) REFERENCES organisations(org_id)
);

-- 插入活动类别
INSERT INTO categories (name) VALUES
('Gala Dinner'),
('Fun Run'),
('Auction'),
('Concert');

-- 插入机构
INSERT INTO organisations (name, contact_info) VALUES
('Helping Hands Charity', 'help@hhcharity.org | +61 400 111 222'),
('Green Earth Foundation', 'info@greenearth.org | +61 400 333 444');

-- 插入示例活动 (至少 8 条)
INSERT INTO events (name, description, event_date, location, category_id, org_id, ticket_price, status, goal_amount, raised_amount)
VALUES
('Annual Charity Gala', 'A formal dinner to raise funds for education.', '2025-11-15', 'Sydney Town Hall', 1, 1, 150.00, 'upcoming', 50000, 12000),
('City Fun Run 2025', 'A community fun run to support children hospitals.', '2025-10-20', 'Melbourne City Park', 2, 2, 30.00, 'upcoming', 20000, 5000),
('Silent Art Auction', 'Auction of donated artworks to fund medical research.', '2025-08-01', 'Brisbane Gallery', 3, 1, 0.00, 'past', 10000, 9500),
('Charity Concert Night', 'Live music concert featuring local bands.', '2025-12-05', 'Perth Arena', 4, 2, 50.00, 'upcoming', 30000, 8000),
('Food Festival for Hope', 'Enjoy food from around the world while donating.', '2025-09-25', 'Adelaide Central Market', 1, 1, 20.00, 'suspended', 15000, 2000),
('Eco-Friendly Fun Run', 'Promoting sustainability with a themed fun run.', '2025-07-15', 'Canberra Lake', 2, 2, 25.00, 'past', 12000, 12000),
('Youth Music Concert', 'Charity event supporting young musicians.', '2025-10-30', 'Darwin City Hall', 4, 1, 40.00, 'upcoming', 18000, 6000),
('Holiday Auction Night', 'Auctioning holiday packages to raise funds.', '2025-12-20', 'Gold Coast Convention Centre', 3, 2, 10.00, 'upcoming', 25000, 4000);
