using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AlintaCodingTest.Controllers
{
    [Route("api/movies")]
    public class MoviesController : Controller
    {
		private readonly HttpClient _httpClient;

		public MoviesController(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

        [HttpGet("")]
        public async Task<IEnumerable<Movie>> GetMovies()
		{
			IEnumerable<Movie> movies = null;

			var resp = await _httpClient.GetAsync("api/Movies");
			if (resp.IsSuccessStatusCode)
			{
				var data = await resp.Content.ReadAsStringAsync();
				movies = JsonConvert.DeserializeObject<IEnumerable<Movie>>(data);
			}

			return movies;
		}
    }
}
