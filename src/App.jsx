import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Connect from "./pages/Connect";
import Explore from "./pages/Explore";
import Collections from "./pages/Collections";
import Item from "./pages/Item";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import Footer from "./pages/Footer";
import ErrorPage from "./pages/ErrorPage";
import Test from "./pages/Test";
function App() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  useEffect(() => {
    if (isConnected) {
      setUserAddress(address);
    }
  });

  const [banners, setBanners] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [newBanners, setNewBanners] = useState([]);
  const [newBannersLoading, setNewBannersLoading] = useState(false);
  const [daysTrending, setDaysTrending] = useState([]);
  const [bannerisLoading, setBannerisLoading] = useState(false);
  const [trendingisLoading, setTrendingisLoading] = useState(false);
  const [trending4NFT, setTrending4NFT] = useState([]);
  const [trending4NFTLoading, setTrending4NFTLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const API = import.meta.env.VITE_ALCHEMY_API;
  const DISPLAY1 = import.meta.env.VITE_HOME_DISPLAY1;
  const DISPLAY2 = import.meta.env.VITE_HOME_DISPLAY2;
  const DISPLAY3 = import.meta.env.VITE_HOME_DISPLAY3;
  const DISPLAY4 = import.meta.env.VITE_HOME_DISPLAY4;

  const ADDRESS1 = import.meta.env.VITE_HOME_CONTRACT1;
  const ADDRESS2 = import.meta.env.VITE_HOME_CONTRACT2;
  const ADDRESS3 = import.meta.env.VITE_HOME_CONTRACT3;
  const ADDRESS4 = import.meta.env.VITE_HOME_CONTRACT4;
  const ADDRESS5 = import.meta.env.VITE_HOME_CONTRACT5;
  const OPENHASH = import.meta.env.VITE_OPENSEA_HASH;
  const ALHASH = import.meta.env.VITE_ALCHEMY_API;
  const ADDRESS7 = import.meta.env.VITE_HOME_CONTRACT7;
  const ADDRESS8 = import.meta.env.VITE_HOME_CONTRACT8;
  const ADDRESS9 = import.meta.env.VITE_HOME_CONTRACT9;
  const ADDRESS10 = import.meta.env.VITE_HOME_CONTRACT10;
  const ADDRESS11 = import.meta.env.VITE_HOME_CONTRACT11;
  const ADDRESS12 = import.meta.env.VITE_HOME_CONTRACT12;
  const ADDRESS13 = import.meta.env.VITE_HOME_CONTRACT13;

  const TRENDINGADDRESS1 = import.meta.env.VITE_HOME_TRENDING1;
  const TRENDINGADDRESS2 = import.meta.env.VITE_HOME_TRENDING2;
  const TRENDINGADDRESS3 = import.meta.env.VITE_HOME_TRENDING3;
  const TRENDINGADDRESS4 = import.meta.env.VITE_HOME_TRENDING4;
  const TRENDINGADDRESS5 = import.meta.env.VITE_HOME_TRENDING5;
  const TRENDINGADDRESS6 = import.meta.env.VITE_HOME_TRENDING6;
  const TRENDINGADDRESS7 = import.meta.env.VITE_HOME_TRENDING7;
  const TRENDINGADDRESS8 = import.meta.env.VITE_HOME_TRENDING8;
  const TRENDINGADDRESS9 = import.meta.env.VITE_HOME_TRENDING9;
  const TRENDINGADDRESS10 = import.meta.env.VITE_HOME_TRENDING10;
  const TRENDINGADDRESS11 = import.meta.env.VITE_HOME_TRENDING11;
  const TRENDINGADDRESS12 = import.meta.env.VITE_HOME_TRENDING12;

  // trending

  const tokenId = 1;
  const tokenId1 = 5;
  const tokenId2 = 10;
  const tokenId3 = 15;

  //categories

  useEffect(() => {
    async function runnner() {
      const response1 = await NotableDrops(ADDRESS1);
      const response2 = await NotableDrops(ADDRESS2);
      const response3 = await NotableDrops(ADDRESS3);
      const response4 = await NotableDrops(ADDRESS4);
      const response5 = await NotableDrops(ADDRESS5);
      const response6 = await NotableDrops(ADDRESS13);
      const response7 = await NotableDrops(ADDRESS7);
      const response8 = await NotableDrops(ADDRESS8);
      const response9 = await NotableDrops(ADDRESS9);
      const response10 = await NotableDrops(ADDRESS10);
      const response11 = await NotableDrops(ADDRESS11);
      const response12 = await NotableDrops(ADDRESS12);
      const trendingresponse1 = await NotableDrops(TRENDINGADDRESS1);
      const trendingresponse2 = await NotableDrops(TRENDINGADDRESS2);
      const trendingresponse3 = await NotableDrops(TRENDINGADDRESS3);
      const trendingresponse4 = await NotableDrops(TRENDINGADDRESS4);
      const trendingresponse5 = await NotableDrops(TRENDINGADDRESS5);
      const trendingresponse6 = await NotableDrops(TRENDINGADDRESS6);
      const trendingresponse7 = await NotableDrops(TRENDINGADDRESS7);
      const trendingresponse8 = await NotableDrops(TRENDINGADDRESS8);
      const trendingresponse9 = await NotableDrops(TRENDINGADDRESS9);
      const trendingresponse10 = await NotableDrops(TRENDINGADDRESS10);
      const trendingresponse11 = await NotableDrops(TRENDINGADDRESS11);
      const trendingresponse12 = await NotableDrops(TRENDINGADDRESS12);

      const allResponses = [
        response1,
        response2,
        response3,
        response4,
        response5,
        response6,
        response7,
        response8,
        response9,
        response10,
        response11,
        response12,
      ].flat();
      const alltrendingResponses = [
        trendingresponse1,
        trendingresponse2,
        trendingresponse3,
        trendingresponse4,
        trendingresponse5,
        trendingresponse6,
        trendingresponse7,
        trendingresponse8,
        trendingresponse9,
        trendingresponse10,
        trendingresponse11,
        trendingresponse12,
      ].flat();
      const selectedBanners = getRandomItems(allResponses, 4);
      const selectedBanners2 = getRandomItems(alltrendingResponses, 9);
      setNewBannersLoading(true);
      setNewBanners([selectedBanners]);
      setNewBannersLoading(false);
      setDaysTrending([selectedBanners2]);
    }
    runnner();
  }, []);
  async function NotableDrops(DropsAddress) {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/getContractMetadata?contractAddress=${DropsAddress}`,
        options
      );
      const data = await response.json();
      return data.openSeaMetadata;
    } catch (error) {
      // console.log("Error fetching data:", error);
      // return null
    }
  }

  // TopBanner
  // TopBanner
  // TopBanner
  // TopBanner
  // Helper function to randomly select two items from an array
  const getRandomItems = (array, numItems) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  };

  useEffect(() => {
    async function getTopBanner() {
      setBannerisLoading(false);
      const response1 = await TopBanner(DISPLAY1);
      const response2 = await TopBanner(DISPLAY2);
      const response3 = await TopBanner(DISPLAY3);
      const response4 = await TopBanner(DISPLAY4);
      setBanners([response1, response2, response3, response4]);
      setBannerisLoading(true);
    }
    getTopBanner();
  }, []);
  async function TopBanner(topbanneraddress) {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };
    try {
      // deal with the chain issue
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/getContractMetadata?contractAddress=${topbanneraddress}`,
        options
      );
      const data = await response.json();
      // // console.log(data);
      return data.openSeaMetadata;
      // setTrendingData(data.collections);
      // setTrendingisLoading(true);
    } catch (error) {
      // console.log("Error fetching data:", error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      setBannerisLoading(false);
      setBannerisLoading(true);
    }

    fetchData();
  }, []);

  // TRENDING CODE
  useEffect(() => {
    async function fetchTrendingDatas() {
      setTrendingisLoading(true);
    }

    fetchTrendingDatas();
  }, []);

  //4 TRENDING ITEMS
  useEffect(() => {
    async function fetchSpecificNftData() {
      setTrending4NFTLoading(false);
      const response1 = await fetchSpecificNftMetaData(ADDRESS1, tokenId);
      const response2 = await fetchSpecificNftMetaData(ADDRESS2, tokenId1);
      const response3 = await fetchSpecificNftMetaData(ADDRESS3, tokenId2);
      const response4 = await fetchSpecificNftMetaData(ADDRESS4, tokenId3);
      setTrending4NFT([response1, response2, response3, response4]);

      setTrending4NFTLoading(true);
    }

    fetchSpecificNftData();
  }, []);

  // cateorgy code
  useEffect(() => {
    async function fetchCategoryData() {
      setCategoriesLoading(false);
      setCategoriesLoading(true);
    }

    fetchCategoryData();
  }, []);

  async function fetchSpecificNftMetaData(tokenAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "X-API-KEY": OPENHASH },
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/specificNftMetadata?contractAddress=${tokenAddress}&tokenIds=${tokenIds}`,
        options
      );
      const data = await response.json();
      // // console.log(data)
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  return (
    <>
      <BrowserRouter>
        <Connect />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                trendingData={trendingData}
                banners={banners}
                trendingisLoading={trendingisLoading}
                trending4NFTLoading={trending4NFTLoading}
                categoriesLoading={categoriesLoading}
                trending4NFT={trending4NFT}
                bannerisLoading={bannerisLoading}
                OPENHASH={OPENHASH}
                ALHASH={ALHASH}
                newBanners={newBanners}
                newBannersLoading={newBannersLoading}
                daysTrending={daysTrending}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                userAddress={userAddress}
                OPENHASH={OPENHASH}
                ALHASH={ALHASH}
              />
            }
          />
          <Route
            path="/collection/:collectionSlug"
            element={
              <Collections
                API={API}
                userAddress={userAddress}
                OPENHASH={OPENHASH}
                ALHASH={ALHASH}
              />
            }
          />
          <Route
            path="/item/:contractAddress/:tokenId"
            element={<Item API={API} OPENHASH={OPENHASH} ALHASH={ALHASH} />}
          />
          <Route exact path="*" element={<ErrorPage />} />
          <Route exact path="/test" element={<Test />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
