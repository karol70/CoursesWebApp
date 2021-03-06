using CoursesApi.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CoursesApi.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountsController: ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountsController(UserManager<IdentityUser> userManager, 
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] UserCredentials userCredentials)
        {
            
            var userExists = await _userManager.FindByEmailAsync(userCredentials.Email);
            if(userExists == null)
            {
                var user = new IdentityUser { UserName = userCredentials.UserName, Email = userCredentials.Email };
                var result = await _userManager.CreateAsync(user, userCredentials.Password);
                if (result.Succeeded)
                {
                    return BuildToken(userCredentials);
                }
                else
                {
                    return BadRequest(result.Errors);
                }
            }
            else
            {
                return BadRequest("Wprowadzono niepoprawne dane");
            }

            
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserCredentials userCredentials)
        {
            var user = await _userManager.FindByEmailAsync(userCredentials.Email);
            if (user != null)
            {
                var userName = user.UserName;
                userCredentials.UserName = userName;

                var result = await _signInManager.PasswordSignInAsync(userCredentials.UserName, userCredentials.Password, isPersistent: false,
                    lockoutOnFailure: false);

                if (result.Succeeded)
                {
                    return BuildToken(userCredentials);
                }
                else
                {
                    return BadRequest("Nieprawidłowe dane");
                }
            }
            return BadRequest("Nieprawidłowe dane, spróbuj ponownie");
        }

        private AuthenticationResponse BuildToken(UserCredentials userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", userCredentials.Email),
                new Claim("userName", userCredentials.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["keyjwt"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer:null, audience:null,claims:claims, expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };
        }
    }
}
