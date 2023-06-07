<h1>Our API setup</h1>
<strong>Refer to`/src/pages/api/README.md` to read the API routes documentation.</strong>

<h2>Tables</h2>
<ul>
	<li>We created our migrations throughout the whole dev process, reason why there tables haven't been created at once in one initial schema;</li>
	<li>We use Models to build our queries for our API calls. Creating Models also allowed us to create easy-to-memorize relation between two tables.</li>
</ul>

<h2>Seeds</h2>
<p>Seeds are practical during development phase as they provide test data and enable an easy database point start.</p>
<ul>
	<li>Make sure all your tables are created. If your database is empty, run `npx knex --esm migrate:latest` to do so;</li>
	<li>Run the command `npx knex seed:run` to run the seeds: this command empty the tables before adding new data;</li>
	<li>You now have every data you need to enjoy the website locally !</li>
</ul>