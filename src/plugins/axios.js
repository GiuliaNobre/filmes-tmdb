import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTQzYzMzY2YxNzNkYjMyY2RhMDFkZjI3Njg4ZDY0OSIsInN1YiI6IjY1MDlhYTZkZmRjNGZhMDExYzE0MDMxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8Ob5dG1jGzWQqct5B_iQdt80MK6KomQAmqyFDag0Rx8`
  }
})

export default api