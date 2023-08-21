using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyStoreAppAPI.Model
{
    public class Orders
    {
        [Key]
        public int order_id { get; set; }
        public int client_id { get; set; }
        public DateTime order_date { get; set; }
    }
}
