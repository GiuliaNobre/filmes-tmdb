<script setup>
import { ref, onMounted } from 'vue'

import api from '@/plugins/axios'
import Loading from 'vue-loading-overlay'
import useGenreStore from '@/stores/genre'

const genreStore = useGenreStore()

const isLoading = ref(false)

function getGenreName(id) {
  const genero = genres.value.find((genre) => genre.id === id)
  return genero.name
}

const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR')

const genres = ref([])

onMounted(async () => {
  const response = await api.get('genre/tv/list?language=pt-BR')
  genres.value = response.data.genres
})

onMounted(async () => {
  isLoading.value = true
  await genreStore.getAllGenres('tv')
  isLoading.value = false
})

const tvs = ref([]);

const listMovies = async (genreId) => {
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            language: 'pt-BR'
        }
    });
    tvs.value = response.data.results
};
</script>

<template>
  <h1>Programas de Tv</h1>
  <ul class="genre-list">
    <li
      v-for="genre in genreStore.genres"
      :key="genre.id"
      @click="listMovies(genre.id)"
      class="genre-item"
    >
      {{ genre.name }}
    </li>
  </ul>
  <loading v-model:active="isLoading" is-full-page />

  <div class="tv-list">
    <div v-for="tv in tvs" :key="tv.id" class="tv-card">
      <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.title" />

      <div class="tv-details">
        <p class="tv-title">{{ tv.title }}</p>
        <p class="tv-release-date">{{ formatDate(tv.release_date) }}</p>
        <p class="tv-genres">
          <span v-for="genre_id in tv.genre_ids" :key="genre_id" @click="listMovies(genre_id)">
            {{ genreStore.getGenreName(genre_id) }}
          </span>
        </p>
        <p class="movie-name">{{ tv.name }}</p>
        <p class="tv-name">{{ tv.original_name }}</p>
        <p class="tv-name">{{ tv.first_air_date }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tv-genres {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  gap: 0.2rem;
}

.tv-genres span {
  background-color: #748708;
  border-radius: 0.5rem;
  padding: 0.2rem 0.5rem;
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.tv-genres span:hover {
  cursor: pointer;
  background-color: #455a08;
  box-shadow: 0 0 0.5rem #748708;
}

h1 {
  text-align: center;
  margin: 70px;
  color: #5e1d0f;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  margin-bottom: 2rem;
  margin: 80px;
}

.genre-item {
  background-color: #8c331f;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #6b2211;
}

.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #bba1a1;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #b6a0a0;
}

.tv-details {
  padding: 0 0.5rem;
}

.tv-title {
  font-size: 1.1rem;
  font-weight: bold;
  line-height: 1.3rem;
  height: 3.2rem;
}
</style>