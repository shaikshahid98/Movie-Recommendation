const API_URL1 = 'http://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=58fb9c173e91f8c9b442b280394070b9&page=(1,2,3)';

const img_path = 'https://image.tmdb.org/t/p/w1280'

const search_api = 'http://api.themoviedb.org/3/search/movie?api_key=58fb9c173e91f8c9b442b280394070b9&query='

const form = document.getElementById('form');

const srch_m = document.getElementById('search');

const main = document.getElementById('main');

form.addEventListener('submit',(e)=>{
	e.preventDefault();
	const srchterm = srch_m.value;
	if(srchterm && srchterm !== '')
	{
		getMovies(search_api+srchterm);
		srch_m.value='';
	}
	else
	{
		window.location.reload();
	}

});

async function getMovies(url)
{
	const res = await fetch(url);
	const data = await res.json();
	console.log(data.results)
	showMovies(data.results);
}

function showMovies(movies)
{
	main.innerHTML='';
	movies.forEach((movie)=>{
		const {title,vote_average,poster_path,overview}= movie;

		const movie_elm = document.createElement('div');
		const col =  (vote_average >= 9) ? 'green' : (vote_average >= 5) ? 'orange' : 'red';

		movie_elm.classList.add('div');

		movie_elm.innerHTML= `
	<div class="movie">
		<img src="${img_path+poster_path}" alt="${title}">
		<div class="movie-info">
				<h3>${title}</h3>
				<span class=${col}>${vote_average}</span>
		</div>
		
		<div class="overview">
			<h3>Overview</h3>
				${overview}
		</div>
	</div>
		`;
		main.appendChild(movie_elm);
	});
}


getMovies(API_URL1);
