using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcSong.Controllers
{
    public class SongsController : Controller
    {
        // GET: Songs
        public ActionResult Index()
        {
            return View();
        }
        
        public ActionResult Square(int id)
        {
            return Content((id).ToString());
        }

        public ActionResult Square2()
        {
            return Square(23);
            //return Content((23 * 23).ToString());
        }
    }
}