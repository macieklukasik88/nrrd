bash ./src/ELT/monthly_revenue.load.sh
psql --host=localhost --user=postgres< ./src/ELT/monthly_production.load.sql
psql --host=localhost --user=postgres< ./src/ELT/fiscal_year_production.load.sql
psql --host=localhost --user=postgres< ./src/ELT/calendar_year_production.load.sql
psql --host=localhost --user=postgres< ./src/ELT/monthly_disbursement.load.sql
psql --host=localhost --user=postgres< ./src/ELT/fiscal_year_disbursement.load.sql
psql --host=localhost --user=postgres < ./src/ELT/revenue_by_company.elt.sql
psql --host=localhost --user=postgres< ./src/ELT/update_metadata.sql
