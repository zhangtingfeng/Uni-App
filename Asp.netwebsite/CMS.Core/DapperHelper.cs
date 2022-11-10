using Dapper;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DTcms.DBUtility
{
    public static class DapperHelper
    {
        public static readonly string ConStr = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        public static SqlConnection CreateDbConnection()
        {
            var connection = new SqlConnection(ConStr);
            connection.Open();
            return connection;
        }

        public static T ExecuteScalar<T>(string sql, object param = null)
        {
            using (var db = CreateDbConnection())
            {
                return db.ExecuteScalar<T>(sql, param);
            }
        }

        public static int ExecuteNonQuery(string sql, object param = null)
        {
            using (var db = CreateDbConnection())
            {
                return db.Execute(sql, param);
            }
        }
        public static List<T> GetList<T>(string sql, object param = null)
        {
            using (var db = CreateDbConnection())
            {
                return (db.Query<T>(sql, param)).ToList();
            }
        }
        public static T Get<T>(string sql, object param = null)
        {
            using (var db = CreateDbConnection())
            {
                return db.QueryFirstOrDefault<T>(sql, param);
            }
        }
    }
}
