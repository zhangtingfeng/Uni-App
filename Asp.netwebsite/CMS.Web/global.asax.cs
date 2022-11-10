using System.Web.Mvc;
using System.Web.Routing;

namespace CMS.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }
    }

    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            RouteTable.Routes.RouteExistingFiles = true;
            routes.MapRoute(
                name: "joinus",
                url: "{controller}/talent-strategy.html",
                defaults: new { controller = "JoinUs", action = "TalentStrategy", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "aftersale",
                url: "{controller}/after-sale.html",
                defaults: new { controller = "Application", action = "AfterSale", id = UrlParameter.Optional }
            );
            routes.MapRoute(
               name: "news-detail",
               url: "news/detail/{aid}.html",
               defaults: new { controller = "news", action = "detail", aid = UrlParameter.Optional }
           );
            routes.MapRoute(
               name: "application-detail",
               url: "application/detail/{aid}.html",
               defaults: new { controller = "application", action = "detail", aid = UrlParameter.Optional }
           );
            routes.MapRoute(
                name: "news-page-list",
                url: "{controller}/{action}/{pageindex}.html",
                defaults: new { controller = "news", pageindex = UrlParameter.Optional }
            );
          
            routes.MapRoute(
                name: "defualt",
                url: "{controller}/{action}.html"
            );
            routes.MapRoute(
                name: "home",
                url: "index.html",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
