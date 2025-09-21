import { SimpleGrid } from "@mantine/core";
import { useEffect, useReducer } from "react";
import type { State, Action } from "../types";
import { LaunchesContext } from "../context";
import Modal from "../components/Modal";
import { CardLaunch } from "../components/Card/CardLaunch";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "load_launch":
      return { ...state, launches: action.payload };

    case "active_launch":
      return { ...state, activeLaunch: action.payload };

    case "open_modal":
      return { ...state, isModalOpen: action.payload };

    default: {
      return state;
    }
  }
}

function App() {
  const initialState: State = {
    launches: [],
    activeLaunch: null,
    isModalOpen: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let ignore = false;

    async function getAllProduct() {
      try {
        const response = await fetch(
          "https://api.spacexdata.com/v3/launches/?launch_year=2020"
        );

        if (!response.ok) {
          throw new Error(`Ошибка HTTP ${response.status}`);
        }
        const resJson = await response.json();

        if (!ignore) {
          dispatch({ type: "load_launch", payload: resJson });
        }
      } catch (e) {
        if (e instanceof Error) {
          console.log(`Ошибка : ${e.message}`);
        } else {
          console.log("Неизвестная ошибка:");
        }
      }
    }

    getAllProduct();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      <LaunchesContext.Provider value={{ state, dispatch }}>
        {state.isModalOpen && <Modal></Modal>}
        <h1> SpaceX Launches 2020</h1>
        <SimpleGrid cols={3} spacing="lg" maw={960} mx="auto" mt="xl">
          {state.launches.map((launch) => (
            <CardLaunch key={launch.mission_name} launch={launch}></CardLaunch>
          ))}
        </SimpleGrid>
      </LaunchesContext.Provider>
    </>
  );
}

export default App;
