using System.ComponentModel.DataAnnotations;

namespace MyStoreAppAPI.Model
{
    public class Products
    {
        [Key]
        public int product_id { get; set; }
        public string title  { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }
        public string image_url { get; set; }
    }
}
