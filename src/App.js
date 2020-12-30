import './App.css';
import StockTable from './components/StockTable';
import Constants from './components/Constants';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron , Container} from "react-bootstrap"

function App() {
const items = Constants().ITEMS;
const fields =  Constants().FIELD_DEF

  return (
    < >

<Jumbotron fluid>
  <Container>
    <h1>React Lightstreamer </h1>
  
    <p>
    A simple stocklist demo application showing integration between React and the Lightstreamer JavaScript Client library.
    </p>
  </Container>
</Jumbotron>
     <StockTable items={items} fields={fields} id="stocks" data-source="lightstreamer" />
    </>
  );
}

export default App;
