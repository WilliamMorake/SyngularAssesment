using System.ComponentModel.DataAnnotations;

namespace MyStoreAppAPI.Model
{
    public class Clients
    {
        [Key]
        public int client_id { get; set; }
        public string first_name { get; set; }
        public string last_name{ get; set; }
        public string address_type{ get; set; }
        public string street_address{ get; set; }
        public string suburb{ get; set; }
        public string city{ get; set; }
        public string postal_code{ get; set; }
    }
}
