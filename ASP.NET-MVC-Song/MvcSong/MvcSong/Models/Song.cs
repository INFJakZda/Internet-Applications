using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MvcSong.Models
{
    public class Song
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Artist { get; set; }
        public string Genre { get; set; }
        public Song()
        {
            
        }
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