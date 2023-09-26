<script setup>
import { ref, onMounted } from 'vue'
import api from '@/plugins/axios'

const tv = ref([]);

const listTv = async (genreId) => {
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            language: 'pt-BR'
        }
    });
    tv.value = response.data.results
};

const genres = ref([])

onMounted(async () => {
  const response = await api.get('genre/tv/list?language=pt-BR')
  genres.value = response.data.genres
})

</script>


  <template>
    <h1>Programa de Tv</h1>
    <ul class="genre-list">
      <li v-for="genre in genres" :key="genre.id" @click="listTv(genre.id)" class="genre-item">
      {{ genre.name }}
  </li>  
    </ul>
  
    <div class="tv-list">
    <div v-for="tv in tv" :key="tv.id" class="tv-card">
      
      <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.title" />
      <div class="tv-details">
        <p class="tv-title">{{ tv.title }}</p>
        <p class="tv-release-date">{{ tv.release_date }}</p>
        <p class="tv-genres">{{ tv.genre_ids }}</p>
        <p class="tv-name">{{ tv.name }}</p>
        <p class="tv-name">{{ tv.original_name }}</p>
        <p class="tv-name">{{ tv.first_air_date}}</p>
      </div>
      
    </div>
  </div>
  </template>



  <style scoped>
 h1{
  text-align: center;
  margin:70px;
  color: #5e1d0f;
}



.genre-item {
  background-color:#8C331F;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #fff;
}

.genre-item:hover {
  cursor: pointer;
  background-color:#6b2211;
  

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
.tv-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tv-card {
  width: 15rem;
  height: 30rem;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 0.5rem #000;
}

.tv-card img {
  width: 100%;
  height: 20rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem #000;
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
 