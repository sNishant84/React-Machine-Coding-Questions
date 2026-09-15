import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Typeahead from "./Typeahead";
import './App.css'
import Carousal from './Carousal';
import FileExplorer from './FileExplorer';
import GridLight from './gridLight';
import FileExplorerContext from "./FileContext";
import Jira from "./Jira";
import commentData from "./commentData.json";
import useComments from "./useComment";
import Comments from './comments';
import VirtualiseList from './virtualiseList';
import Graph from './graph';
import MovingDot from './MovingDot';
import MemoryGame from './MemoryGame';
import TicTacToe from './ticTacToe';
import ProgressBar from './ProgressBar';
import TrafficLight from './trafficLight';
import FileExplorer1 from './FileExplorer1';
import IntermediateCheckBox from './IntermediateCheckBox';
import JiraBoard from './JiraBoard';
import ToastNotification from './ToastNotification';
import InfiniteScroll from './InfiniteScroll';
import MultiSelectInput from './MultiSelectInput';
import StarRating from './StarRating';
import FileExplorerMain from './FileExplorerMain';
import FileExplorerContextWrapper from './FileExplorerContext';
import Stepper from './Stepper';
import PollingWidget from './PollingWidget';
import Otp from './Otp';
import MemoryGames from './MemoryGames';
import VirtualizedList from './virtualizedList';
import AutoComplete from './AutoComplete';
import Counter from './Counter';
import Table from './table';
import Elevator from './Elevator';
import TransferList from './TransferList';
import Basic from './Basic';
import OverLappingCircle from './OverLappingCircle';
import MultiStepForm from './MultiStepForm';
import MultipleState from './MultipleState';
import ChessBoard from "./ChessBoard"
import NestedComments from './NestedComments';
import { CommentContextWrapper } from './CommentContext';
import TicTacToeBot from './TicTacToeBot';
import MainQuiz from './Quiz';
import MainCart from './MainCart';
import { CartProvider } from './CartContext';
import FeatureDummyComponent from './FeatureDummyComponent';
import { FeatureFlagProvider } from './FeatureContext';
import Pagination from './Pagination';
import ThemeSwitcher from './ThemeSwitcher';
import { ThemeContextProvider } from './ThemeContext';
import PasswordGenerator from './PasswordGenerator';
import SelectableGrid from './selectableGrid';
import TicTacToe2 from './TicTacToe2';
import QuizApp from './Quiz';
import { Todo } from './Todo';
import CustomMultiSelect from './multiselect';
import CustomSelect from './multiselect';
import CinemaHallBooking from './Cinema';
import DynamicFormWithColumns from './DynamicForm';
import DynamicFormFields from './DynamicForm';
import SnakeAndLadder from './snakeLadder';
import Traffic from "./Traffic2";
import Post from './Post';
import UserPost from './UserPost';
import NestedAccordian from './NestedAccordian';
import Circleredo from './circleredo';
import Grid from './Grid';
import Game from './Game';
import CitySearch from './Search';
import DynamicForm from './Form';
import StockBar from './StockBar';
import OrderBook from './OrderBook';
import AnnotateWords from './Annotation';
import CommentSection from './CommentSection';
import { ChatApp } from './chatApp';



function App() {

 const [checked,setChecked]=useState({})
 const CheckboxesData = [
  {
    id: 1,
    label: "Fruits",
    children: [
      { id: 2, label: "Apple" },
      { id: 3, label: "Banana" },
      {
        id: 4,
        label: "Citrus",
        children: [
          { id: 5, label: "Orange" },
          { id: 6, label: "Lemon" },
        ],
      },
    ],
  },
  {
    id: 7,
    label: "Vegetables",
    children: [
      { id: 8, label: "Carrot" },
      { id: 9, label: "Broccoli" },
    ],
  },
];

const options = [
  { value: 'apple', label: 'Apple 🍎' },
  { value: 'banana', label: 'Banana 🍌' },
  { value: 'cherry', label: 'Cherry 🍒' },
  { value: 'mango', label: 'Mango 🥭' },
];


  return (
    <>
    {/* <h1>Hello</h1> */}
    {/* <ThemeContextProvider>
    <ThemeSwitcher />
    </ThemeContextProvider>
     */}
    {/* <CustomSelect options={options} /> */}
    {/* <CustomSelect options={options} /> */}
    {/* <CustomSelect options={options} /> */}
    {/* <Traffic /> */}
    {/* <ProgressBar /> */}
    {/* <VirtualiseList /> */}
    {/* <StockBar /> */}
    {/* <OrderBook /> */}
    {/* <AnnotateWords /> */}
    {/* <CartProvider>
    <MainCart />
    </CartProvider> */}
    {/* <Elevator /> */}
    {/* <FileExplorerContext>
    <FileExplorer />
    </FileExplorerContext> */}
    {/* <CustomMultiSelect options={options} /> */}
    <Graph />
    </>

    
  )
}

export default App
