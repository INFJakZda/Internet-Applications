using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcSong.Models
{
    public class Song
    {
        int Id;
        string Name;
        string Artist;
        string Genre;

        public Song(int id, string name, string artist, string genre)
        {
            this.Id = id;
            this.Name = name;
            this.Artist = artist;
            this.Genre = genre;
        }

        public String getName() { return Name; }
    }
}