import { useState } from "react";
import { Formik, Form, Field } from "formik";
import './header.css'
const App = () => {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  //console.log(photos);
  return (
    <div>
      <header>
        <Formik
          initialValues={{search: ''}}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID J3XgWsqqG8-VyCpIcp9R-ngrmKSj2M66dQJRS3Wfh60'
              }
            })
            const data = await response.json()
            // llamar a api de celya
            setPhotos(data.results)
          }}
        >
          <Form>
            <Field name="search" />
            <Field name="credito" />
            <Field name="solicitud" />
            <Field name="Enviar" /> 
          </Form>  
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular} alt="prueba"/> 
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>)}
        </div>
      </div>
    </div>
  )
}
export default App;
