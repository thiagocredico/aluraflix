const API_KEY = import.meta.env.VITE_API_KEY;
console.log('apikey',API_KEY);
const BASE_URL = 'https://api.themoviedb.org/3';
const LANGUAGE = 'language=pt-BR';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${BASE_URL}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: 'Originais do Netflix',
                items: await basicFetch(`/discover/tv?api_key=${API_KEY}&with_networks=213&${LANGUAGE}`)
            },
            {
                slug: 'trending',
                title: 'Recomendados para Você',
                items: await basicFetch(`/trending/all/week?api_key=${API_KEY}&${LANGUAGE}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?api_key=${API_KEY}&${LANGUAGE}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=28&${LANGUAGE}`)
            },
            {
                slug: 'adventure',
                title: 'Aventura',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=12&${LANGUAGE}`)
            },
            {
                slug: 'animation',
                title: 'Animação',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=16&${LANGUAGE}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=35&${LANGUAGE}`)
            },
            {
                slug: 'crime',
                title: 'Crime',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=80&${LANGUAGE}`)
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=99&${LANGUAGE}`)
            },
            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=18&${LANGUAGE}`)
            },
            {
                slug: 'family',
                title: 'Família',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=10751&${LANGUAGE}`)
            },
            {
                slug: 'fantasy',
                title: 'Fantasia',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=14&${LANGUAGE}`)
            },
            {
                slug: 'history',
                title: 'História',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=36&${LANGUAGE}`)
            },
            {
                slug: 'horror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=27&${LANGUAGE}`)
            },
            {
                slug: 'music',
                title: 'Música',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=10402&${LANGUAGE}`)
            },
            {
                slug: 'mistery',
                title: 'Mistério',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=9648&${LANGUAGE}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=10749&${LANGUAGE}`)
            },
            {
                slug: 'sciencefiction',
                title: 'Ficção Científica',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=878&${LANGUAGE}`)
            },
            {
                slug: 'thriller',
                title: 'Thriller',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=53&${LANGUAGE}`)
            },
            {
                slug: 'war',
                title: 'Guerra',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=10752&${LANGUAGE}`)
            },
            {
                slug: 'western',
                title: 'Faroeste',
                items: await basicFetch(`/discover/movie?api_key=${API_KEY}&with_genres=37&${LANGUAGE}`)
            }
        ]
    },
    getMovieInfo: async (movieId, type) => {
        const info = await basicFetch(`/${type}/${movieId}?api_key=${API_KEY}&${LANGUAGE}`);
        return info;
    },
    getTrailer: async (movieId, type) => {
        let trailer = await basicFetch(`/${type}/${movieId}/videos?api_key=${API_KEY}&${LANGUAGE}`);
        let foundTrailer = trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube' && video.iso_639_1 === 'pt');
    
        if (!foundTrailer) {
            trailer = await basicFetch(`/${type}/${movieId}/videos?api_key=${API_KEY}&language=en-US`);
            foundTrailer = trailer.results.find(video => video.type === 'Trailer' && video.site === 'YouTube' && video.iso_639_1 === 'en');
        }
    
        return foundTrailer;
    }
    
}