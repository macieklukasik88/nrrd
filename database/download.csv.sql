\copy (select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region, recipient, fund_class, fund.fund_type, fund.revenue_type, fund.source, commodity, product , disbursement, duplicate_no, row_number from disbursement join period using(period_id) join location using (location_id) join fund using(fund_id) join commodity using(commodity_id) where period='Monthly' order by row_number) to 'montly_disbursement.csv' with csv


\copy (select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region, recipient, fund_class, fund.fund_type, fund.revenue_type, fund.source, commodity, product , disbursement, duplicate_no, row_number from disbursement join period using(period_id) join location using (location_id) join fund using(fund_id) join commodity using(commodity_id) where period='Fiscal Year' order by row_number) to 'disbursement.csv' with csv

\copy (select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , volume, duplicate_no, row_number from production join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Monthly' order by row_number) to 'montly_production.csv' with csv

\copy (select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , volume, duplicate_no, row_number from production join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Fiscal Year' order by row_number) to 'fiscal_year_production.csv' with csv

\copy (select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , volume, duplicate_no, row_number from production join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Calendar Year' order by row_number) to 'calendar_year_production.csv' with csv

\copy (select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , revenue, duplicate_no, row_number from revenue join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Monthly' order by row_number) to 'montly_revenue.csv' with csv

\copy (select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , revenue, duplicate_no, row_number from revenue join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Fiscal Year' order by row_number) to 'fiscal_year_revenue.csv' with csv

\copy (select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , revenue, duplicate_no, row_number from revenue join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Calendar Year' order by row_number) to 'calendar_year_revenue.csv' with csv

drop view download_monthly_revenue;
create view download_monthly_revenue as (
select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , revenue, duplicate_no, row_number from revenue join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Monthly' order by row_number
);

drop view download_calendar_revenue;
create view download_calendar_revenue as (
select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , revenue, duplicate_no, row_number from revenue join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Calendar Year' order by row_number
);

drop view download_fiscal_year_revenue;
create view download_fiscal_year_revenue as (
select period, calendar_year, fiscal_year, month, month_long, fiscal_month, period_date, location_name, fips_code, state, state_name, county, land_class, land_category, land_type, region_type, district_type, offshore_region,  commodity, product , revenue, duplicate_no, row_number from revenue join period using(period_id) join location using (location_id)  join commodity using(commodity_id) where period='Fiscal Year' order by row_number
);


