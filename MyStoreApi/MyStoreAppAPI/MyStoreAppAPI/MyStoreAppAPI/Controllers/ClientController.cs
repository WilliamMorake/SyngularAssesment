using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyStoreAppAPI.Data;
using MyStoreAppAPI.Model;
using System.Text.Json.Serialization;

namespace MyStoreAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ClientController : Controller
    {
        private readonly MyStoreAPIDBContext _context;
        public ClientController(MyStoreAPIDBContext myStoreAPIDBContext)
        {
            _context = myStoreAPIDBContext;
        }

        [HttpPost(Name = "RegisterClient")]
        
        async public Task<IActionResult> RegisterClient(Clients client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet(Name = "GetClientProfile")]
        async public Task<IActionResult> GetClient(int clientId)
        {
            var client = await _context.Clients.FindAsync(clientId);
            return Ok(client);
        }

        [HttpGet(Name = "GetClientByName")]
        public IActionResult GetClientByname(string clientName)
        {
            Clients? clients = null;
            foreach(var cnt  in _context.Clients)
            {
                if(cnt.first_name == clientName)
                {
                    clients = cnt;
                }
            }

            //var client = await _context.Clients.FindAsync($"{clientName}");
            return Ok(clients);
        }


    }
}
