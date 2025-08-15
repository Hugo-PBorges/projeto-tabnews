import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseMaxConnectionsResult = await database.query(
    "SHOW max_connections;",
  );

  const nomeDataBase = process.env.POSTGRES_DB;
  const databaseOpendConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [nomeDataBase],
  }
  );

  //    "SELECT COUNT(*)::int FROM pg_stat_activity WHERE datname = 'postgres' AND pid = pg_backend_pid();",

  const databaseVersionValue = databaseVersionResult.rows[0].server_version;
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;
  const databaseOpendConnectionsResultValue =
    databaseOpendConnectionsResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        opend_connections: databaseOpendConnectionsResultValue,
      },
    },
  });
}

export default status;
