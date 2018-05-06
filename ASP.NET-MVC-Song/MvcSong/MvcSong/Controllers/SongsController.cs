using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcSong.Models;

namespace MvcSong.Controllers
{
    public class SongsController : Controller
    {
        // GET: Songs
        public ActionResult Index()
        {
            Song song = new Song(1, "April", "Jhon", "pop");
            return View(song);
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