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
            try
            {
                _context.Clients.Add(client);
                await _context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while registering the client.");
            }
        }

        [HttpGet(Name = "GetClientProfile")]
        async public Task<IActionResult> GetClient(int clientId)
        {
            try
            {
                var client = await _context.Clients.FindAsync(clientId);
                if (client != null)
                {
                    return Ok(client);
                }
                else
                {
                    return NotFound("Client not found.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the client profile.");
            }
        }

        [HttpGet(Name = "GetClientByName")]
        public IActionResult GetClientByname(string clientName)
        {
            try
            {
                Clients? clients = null;
                foreach (var cnt in _context.Clients)
                {
                    if (cnt.first_name == clientName)
                    {
                        clients = cnt;
                        break; // Found a match, exit the loop
                    }
                }

                if (clients != null)
                {
                    return Ok(clients);
                }
                else
                {
                    return NotFound("Client not found.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while fetching the client by name.");
            }
        }


    }
}
