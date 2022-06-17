 import { useState } from "react";
import { Formik, Form, Field } from "formik";
import Input from './components/Input'
import './header.css'
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const App = ({ signOut, user }) => {
  const handleSubmit = () => {}
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  //console.log(photos);
  return (
    <>
    <h1>Helou Mr {user.username}</h1>
    <button onClick={signOut}>Sign out</button>
    <div>
      <header>
        <Formik
          initialValues={{
            title: '', 
            body: ''
          }}
          /*onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID J3XgWsqqG8-VyCpIcp9R-ngrmKSj2M66dQJRS3Wfh60'
              }
            })
            const data = await response.json()
            // llamar a api de celya
            setPhotos(data.results)
          }}*/
          
          onSubmit={ values => {
            fetch('https://jsonplaceholder.typicode.com/posts', {
              method: 'POST',
              body: JSON.stringify({
                title: values.title,
                body: values.body
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
             })
                .then((response) => response.json())
                .then((json) => console.log(json))
          }}
        >
          { ({values, handleSubmit, handleChange, handleBlur}) => (
          <Form onSubmit={handleSubmit}>
            
            <div>
              <label htmlFor="title">Titulo</label> 
              <Field type="text" id="title" name="title" placeholder="Titulo" />
            </div>
            <div>
              <label htmlFor="body">Descripcion</label>
              <Field type="text" id="body" name="body" placeholder="Descripcion" />
            </div>  
            <button type="submit">Enviar</button>
          </Form>
          )}
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
    </>
  )
}
//export default App;
export default withAuthenticator(App);

/*
import { Formik, Form, Field } from 'formik';
import './header.css'
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

function App({ signOut, user }) {
  return (
    <>
      <h1>Helou Mr {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
      <div>
        <Formik
          initialValues={{search: '' }}
          onSubmit={async values => {
            // llamar a api de unsplash
            console.log(values)
          }}
        >
          <Form>
            <Field name="search"/>
            <Field name="credito"/>
          </Form>  
        </Formik>  
      </div>
    </>
    
  );
}

export default withAuthenticator(App); */
