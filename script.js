
const options = {
   method: 'GET',
   headers: {
     accept: 'application/json',
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzUyOTg1ZTljNzg4YzE3YmFmMmY3NjZhZWYyNDA3MCIsInN1YiI6IjY1NjY0ZTJhMTU2Y2M3MDBlYmMxMTk3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yYL1HiqW4zSjwrCp_8GRmn-IO73Qqg8Co4H_ASgvQuE',
    }
 };
  
  async function displayApod() {
      const apodPropieties = await getApod();
      console.log(apodPropieties);
      addApodUI(apodPropieties);
}
  
  async function getApod() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/157336/videos?api_key=7352985e9c788c17baf2f766aef24070`)
      if (response.status === 404 ){
        alert("No se encontró tu llave");
        return;
      }
      return await response.json();
    } catch (err) {
      alert("Error al intentar conectar con el servidor");
    }
  }
  
  function addApodUI(apod) {
    const apodList = document.getElementById("nasa_container");
    const element = document.createElement("div");
    element.innerHTML = `
    <strong title: >ID: </strong> ${apod.id}
      <strong date: >Name: </strong> ${apod.results[0].site}
    `;
    apodList.appendChild(element);
  }
  
  displayApod();

//yo primero desde mi branch


  