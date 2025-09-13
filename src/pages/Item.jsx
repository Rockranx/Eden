import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiArrowRightSLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import Loader from "./buttons&loaders/Loader";
import { ethers } from "ethers";
import "./ss.css";
import EventsTable from "./ActivityTable";
const Item = ({ API, OPENHASH, ALHASH }) => {
  const { contractAddress, tokenId } = useParams();
  const [nftOwner, setNftOwner] = useState([]);
  const [currentNft, setCurrentNft] = useState([]);
  const [currentNftDetails, setCurrentNftDetails] = useState([]);
  const [currentNftCollectionDetails, setCurrentNftCollectionDetails] =
    useState([]);
  const [currentNftLoading, setCurrentNftLoading] = useState("");
  const [traitstab, setTraitstab] = useState(false);
  const [traitsdetails, setTraitsdetails] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isdetailsExpanded, setIsdetailsExpanded] = useState(false);
  const [islistingExpanded, setIslistingExpanded] = useState(false);
  const [isOfferExpanded, setIsOfferExpanded] = useState(false);
  const [transData, setTransData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [listingData, setListingData] = useState([]);
  const [isFetchdata, setIsFetchdata] = useState(false);
  const [nftsdetails, setNftsdetails] = useState([]);
  const [nftsListings, setNftsListings] = useState([]);
  const [noNftsListings, setNoNftsListings] = useState(false);
  const [currentOffer, setCurrentOffer] = useState([]);
  const [expirationDate, setExpirationDate] = useState([]);
  const [weiValue, setWeiValue] = useState(0);
  const [eth, setEth] = useState(0);
  const [currentPriceValue, setCurrentPriceValue] = useState("");

  const [currentDateValue, setCurrentDateValue] = useState("");
  const [currentTimeValue, setCurrentTimeValue] = useState("");

  const [currentDateValue1, setCurrentDateValue1] = useState("");
  const [currentTimeValue2, setCurrentTimeValue2] = useState("");

  // // console.log(contractAddress, tokenId);
  useEffect(() => {
    async function fetchSpecificNftData() {
      setCurrentNftLoading(false);
      setCurrentNft([]);
      const response1 = await fetchSpecificNftMetaData(
        contractAddress,
        tokenId
      );
      const response2 = await fetchNftOwner(contractAddress, tokenId);
      const response3 = await fetchTraits(contractAddress, tokenId);
      const response4 = await fetchNftActivity(contractAddress, tokenId);
      const response5 = await fetchNftListingPrice(contractAddress, tokenId);

      setCurrentNft([response2]);
      setCurrentNftDetails([response3]);
      setActivityData(response4);
      if (response5.length === 0) {
        setNoNftsListings(true);
      } else {
        setListingData(response5);
      }

      setTraitsdetails(response1.raw.metadata.attributes);
      // if (response1) {
      //   console.log(response1);
      // }
      setNftOwner([response2]);
      setCurrentNftLoading(true);
      console.log(response5);
    }

    fetchSpecificNftData();
  }, []);
  // console.log(noNftsListings)
  let Pricey;
  let PriceValues;

  let nftconshort1 = contractAddress.slice(0, 5);
  let nftconshort2 = contractAddress.slice(38);

  // // console.log(nftconshort1)

  async function fetchSpecificNftMetaData(contractAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json" },
    };

    try {
      const response = await fetch(
        `https://eth-mainnet.g.alchemy.com/nft/v3/${ALHASH}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenIds}&refreshCache=false`,
        options
      );
      const data = await response.json();
      return data;
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
  async function fetchNftOwner(contractAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "X-API-KEY": OPENHASH },
    };

    try {
      const response = await fetch(
        `/alchemy/nft/v3/${ALHASH}/getNFTMetadata?contractAddress=${contractAddress}&tokenId=${tokenIds}&refreshCache=false`,

        options
      );
      const data = await response.json();
      return data;
      // console.log("data", data);
    } catch (error) {
      // console.error(error);
      return null;
    }
  }

  // // console.log(nftsdetails)
  function tuner() {
    setTraitstab(!traitstab);
  }
  // // console.log(traitstab);

  const handleBodyClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDetailsClick = () => {
    setIsdetailsExpanded(!isdetailsExpanded);
  };
  const handlelistingClick = () => {
    setIslistingExpanded(!islistingExpanded);
  };
  const handleOfferClick = () => {
    setIsOfferExpanded(!isOfferExpanded);
  };
  async function fetchTraits(contractAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-api-key": OPENHASH },
    };

    try {
      const response = await fetch(
        `https://api.opensea.io/api/v2/chain/ethereum/contract/${contractAddress}/nfts/${tokenIds}`,

        options
      );
      const data = await response.json();

      return data.nft;
      // console.log("opne sea", data);
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
  async function fetchNftListing(contractSlug, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-api-key": OPENHASH },
    };

    try {
      const response = await fetch(
        `https://api.opensea.io/api/v2/listings/collection/${contractSlug}/nfts/${tokenIds}/best`,
        options
      );
      const data = await response.json();

      return data.nft;
      // console.log("opne sea", data);
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
  async function fetchNftActivity(contractAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-api-key": OPENHASH },
    };

    try {
      const response = await fetch(
        `https://api.opensea.io/api/v2/events?chain=ethereum&contract_address=${contractAddress}&token_id=${tokenIds}&limit=100`,
        options
      );
      const data = await response.json();

      return data.asset_events;
      // console.log("activity data", data);
    } catch (error) {
      // console.error(error);
      return null;
    }
  }
  async function fetchNftListingPrice(contractAddress, tokenIds) {
    const options = {
      method: "GET",
      headers: { accept: "application/json", "x-api-key": OPENHASH },
    };

    try {
      const response = await fetch(
        `https://api.opensea.io/api/v2/orders/ethereum/seaport/listings?asset_contract_address=${contractAddress}&order_direction=asc&token_ids=${tokenIds}`,
        options
      );
      const data = await response.json();

      return data.orders;
      // console.log("listing data", data);
    } catch (error) {
      // console.error(error);
      return null;
    }
  }

  // // console.log(currentNftDetails[0].owners);
  return (
    <>
      <div className="home initDisplay" id="main-wrapper">
        {currentNftLoading ? (
          <>
            {currentNft.map((item, index) => {
              // // console.log("thisis item", item);
              // // console.log(item.raw.metadata.attributes);

              let deployer1 = currentNftDetails[0]?.owners[0]?.address.slice(
                0,
                5
              );
              let deployer2 =
                currentNftDetails[0]?.owners[0]?.address.slice(38);

              return (
                <>
                  <div className="item-single section-padding">
                    <div className="container">
                      <div className="row">
                        <div className="col-xxl-12">
                          <div className="top-bid">
                            <div className="card-body">
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="Desktop modi">
                                    <h5 className="mb-3">
                                      <Link></Link>
                                    </h5>
                                    <h3 className="mb-3">{item.name}</h3>
                                    <div className="d-flex align-items-center mb-3">
                                      <div className="flex-grow-1">
                                        <div className="nfttitle">
                                          <h6 className="mb-0">Owner</h6>

                                          <>
                                            {" "}
                                            <h5 className="mb-0">
                                              <Link
                                                to={`https://etherscan.io/address/${currentNftDetails[0]?.owners[0]?.address}`}
                                              >
                                                {deployer1}...{deployer2}
                                              </Link>
                                            </h5>
                                          </>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="item2">
                                    <img
                                      src={item.image.cachedUrl}
                                      className="img-fluid rounded"
                                      alt="..."
                                    />
                                  </div>
                                  <div>
                                    <div className="Desktop">
                                      <div className="offerbox">
                                        <div>
                                          <h5>Current Price</h5>
                                        </div>
                                        {noNftsListings ? (
                                          <>
                                            {" "}
                                            <div className="noData">
                                              <h1>No Data</h1>
                                            </div>
                                          </>
                                        ) : (
                                          <>
                                            {listingData.map((data, indexa) => {
                                              const timestamp =
                                                data.closing_date;
                                              const date = new Date(timestamp);

                                              // // Get the local date string
                                              const localDateString =
                                                date.toLocaleDateString();

                                              // // Get the local time string
                                              const localTimeString =
                                                date.toLocaleTimeString();

                                              let sellerAddy1 =
                                                data.maker.address.slice(0, 5);
                                              let sellerAddy2 =
                                                data.maker.address.slice(38);
                                              let ListingPrice;
                                              let ListingPriceValues;
                                              let ethh;
                                              if (data.current_price) {
                                                ListingPrice =
                                                  data.current_price;

                                                const weiStringValue =
                                                  ListingPrice.toString();
                                                const etherValue =
                                                  ethers.utils.formatEther(
                                                    weiStringValue
                                                  );

                                                ListingPriceValues = etherValue;
                                                ethh = "ETH";
                                              }
                                              return (
                                                <>
                                                  <div>
                                                    <h1>
                                                      {ListingPriceValues} ETH
                                                    </h1>
                                                  </div>
                                                  <div>
                                                    <h4>
                                                      Expires by :{" "}
                                                      {localDateString}{" "}
                                                      {localTimeString}{" "}
                                                    </h4>
                                                  </div>
                                                </>
                                              );
                                            })}
                                          </>
                                        )}
                                      </div>

                                      <div className="offerbox">
                                        <div
                                          className="Listingheader"
                                          onClick={handlelistingClick}
                                          style={{ cursor: "pointer" }}
                                        >
                                          <h4>Listings</h4>
                                        </div>
                                        <div
                                          className={`listingdropdown ${
                                            islistingExpanded ? "expanded" : ""
                                          }`}
                                        >
                                          {islistingExpanded && (
                                            <>
                                              {noNftsListings ? (
                                                <>
                                                  <div className="noData">
                                                    <h1>No Data</h1>
                                                  </div>
                                                </>
                                              ) : (
                                                <>
                                                  <hr />

                                                  <div className="detailsContainer">
                                                    <table className="table-container">
                                                      <thead>
                                                        <tr>
                                                          <th>From</th>
                                                          <th>Price</th>

                                                          <th>Expiration</th>
                                                          <th>Quantity</th>
                                                        </tr>
                                                      </thead>
                                                      <tbody>
                                                        {listingData.map(
                                                          (data, indexes) => {
                                                            // console.log(data);
                                                            const timestamp =
                                                              data.closing_date;
                                                            const date =
                                                              new Date(
                                                                timestamp
                                                              );

                                                            // // Get the local date string
                                                            const localDateString =
                                                              date.toLocaleDateString();

                                                            // // Get the local time string
                                                            const localTimeString =
                                                              date.toLocaleTimeString();

                                                            let sellerAddy1 =
                                                              data.maker.address.slice(
                                                                0,
                                                                5
                                                              );
                                                            let sellerAddy2 =
                                                              data.maker.address.slice(
                                                                38
                                                              );
                                                            let ListingPrice;
                                                            let ListingPriceValues;
                                                            let ethh;
                                                            if (
                                                              data.current_price
                                                            ) {
                                                              ListingPrice =
                                                                data.current_price;

                                                              const weiStringValue =
                                                                ListingPrice.toString();
                                                              const etherValue =
                                                                ethers.utils.formatEther(
                                                                  weiStringValue
                                                                );

                                                              ListingPriceValues =
                                                                etherValue;
                                                              ethh = "ETH";
                                                            }
                                                            return (
                                                              <>
                                                                <tr>
                                                                  <td>
                                                                    {
                                                                      sellerAddy1
                                                                    }
                                                                    ...
                                                                    {
                                                                      sellerAddy2
                                                                    }
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      ListingPriceValues
                                                                    }{" "}
                                                                    ETH
                                                                  </td>
                                                                  <td>
                                                                    {localDateString +
                                                                      " " +
                                                                      localTimeString}
                                                                  </td>
                                                                  <td>
                                                                    {
                                                                      data.remaining_quantity
                                                                    }
                                                                  </td>
                                                                </tr>
                                                              </>
                                                            );
                                                          }
                                                        )}
                                                      </tbody>
                                                    </table>
                                                  </div>
                                                </>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </div>

                                      <div className="d-flex Ender">
                                        <a
                                          href={`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`}
                                        >
                                          <button className="btn btn-primary">
                                            View on OpenSea
                                          </button>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="boxbelowimage item1">
                                    <div className="descriptionbox">
                                      <div className="topdesc">
                                        <h4>Description</h4>
                                      </div>
                                      <hr />
                                      {item.description !== null ? (
                                        <>
                                          <p className="mb-3">
                                            {item.description}
                                          </p>
                                        </>
                                      ) : (
                                        <>
                                          <p className="mb-3">No description</p>
                                        </>
                                      )}
                                    </div>
                                    <div className="traitssection">
                                      <div
                                        className="topdesc"
                                        onClick={handleBodyClick}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <h4>
                                          Traits
                                          <RiArrowRightSLine />
                                        </h4>
                                      </div>

                                      <div
                                        className={`traitsdropdown ${
                                          isExpanded ? "expanded" : ""
                                        }`}
                                      >
                                        {isExpanded && (
                                          <>
                                            <hr />
                                            <div className="bid mb-3 card">
                                              <div className="activity-content card-body py-0">
                                                <ul className="splitdisplay">
                                                  {currentNftDetails.map(
                                                    (details, detailsindex) => {
                                                      // // console.log(details);
                                                      return (
                                                        <>
                                                          {details.traits.map(
                                                            (
                                                              trait,
                                                              indexers
                                                            ) => {
                                                              return (
                                                                <>
                                                                  <li
                                                                    className="d-flex justify-content-between align-items-center split"
                                                                    key={
                                                                      detailsindex
                                                                    }
                                                                  >
                                                                    <div className="activity-info text-center">
                                                                      <h5
                                                                        className="mb-0"
                                                                        style={{
                                                                          textTransform:
                                                                            "capitalize",
                                                                        }}
                                                                      >
                                                                        {
                                                                          trait.trait_type
                                                                        }
                                                                      </h5>
                                                                    </div>

                                                                    <div className="text-center">
                                                                      <span
                                                                        className="text-muted"
                                                                        style={{
                                                                          textTransform:
                                                                            "capitalize",
                                                                        }}
                                                                      >
                                                                        {
                                                                          trait.value
                                                                        }
                                                                      </span>
                                                                    </div>
                                                                  </li>
                                                                </>
                                                              );
                                                            }
                                                          )}
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </ul>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                    <div className="detailssection">
                                      <div
                                        className="topdesc"
                                        onClick={handleDetailsClick}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <h4>
                                          Details
                                          <RiArrowRightSLine />
                                        </h4>
                                      </div>
                                      <div
                                        className={`detailsdropdown ${
                                          isdetailsExpanded ? "expanded" : ""
                                        }`}
                                      >
                                        {isdetailsExpanded && (
                                          <>
                                            <hr />
                                            <div className="detailsContainer">
                                              <div className="detailsItem">
                                                <span>Contract Address</span>
                                                <span>
                                                  <Link
                                                    to={`https://etherscan.io/address/${contractAddress}`}
                                                  >
                                                    {nftconshort1}...
                                                    {nftconshort2}
                                                  </Link>
                                                </span>
                                              </div>
                                              <div className="detailsItem">
                                                <span>Token Id</span>
                                                <span>{tokenId}</span>
                                              </div>
                                              <div className="detailsItem">
                                                <span>Token Standard</span>
                                                <span
                                                  style={{
                                                    textTransform: "capitalize",
                                                  }}
                                                >
                                                  {currentNftDetails.map(
                                                    (type, inds) => {
                                                      return (
                                                        <>
                                                          {type.token_standard}
                                                        </>
                                                      );
                                                    }
                                                  )}
                                                </span>
                                              </div>
                                              <div className="detailsItem">
                                                <span>Chain</span>
                                                <span
                                                  style={{
                                                    textTransform: "capitalize",
                                                  }}
                                                >
                                                  Ethereum
                                                </span>
                                              </div>
                                              <div className="detailsItem">
                                                <span>Deployer</span>
                                                <span>
                                                  {currentNftDetails.map(
                                                    (type, inds) => {
                                                      return (
                                                        <>{type.creator}</>
                                                      );
                                                    }
                                                  )}
                                                </span>
                                              </div>
                                            </div>
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-md-6 mobile">
                                  <h5 className="mb-3">
                                    <Link></Link>
                                  </h5>
                                  <h3 className="mb-3"></h3>
                                  <div className="d-flex align-items-center mb-3">
                                    <div className="flex-grow-1">
                                      <div className="nfttitle">
                                        <h6 className="mb-0">Owner</h6>
                                        <h5 className="mb-0">
                                          <Link
                                            to={`https://etherscan.io/address/${currentNftDetails[0]?.owners[0]?.address}`}
                                          >
                                            {deployer1}...{deployer2}
                                          </Link>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="offerbox">
                                    <div>
                                      <h5>Current Price</h5>
                                    </div>
                                    {noNftsListings ? (
                                      <>
                                        {" "}
                                        <div className="noData">
                                          <h1>No Data</h1>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        {listingData.map((data, indexa) => {
                                          const timestamp = data.closing_date;
                                          const date = new Date(timestamp);

                                          // // Get the local date string
                                          const localDateString =
                                            date.toLocaleDateString();

                                          // // Get the local time string
                                          const localTimeString =
                                            date.toLocaleTimeString();

                                          let sellerAddy1 =
                                            data.maker.address.slice(0, 5);
                                          let sellerAddy2 =
                                            data.maker.address.slice(38);
                                          let ListingPrice;
                                          let ListingPriceValues;
                                          let ethh;
                                          if (data.current_price) {
                                            ListingPrice = data.current_price;

                                            const weiStringValue =
                                              ListingPrice.toString();
                                            const etherValue =
                                              ethers.utils.formatEther(
                                                weiStringValue
                                              );

                                            ListingPriceValues = etherValue;
                                            ethh = "ETH";
                                          }
                                          return (
                                            <>
                                              <div>
                                                <h1>
                                                  {ListingPriceValues} ETH
                                                </h1>
                                              </div>
                                              <div>
                                                <h4>
                                                  Expires by : {localDateString}{" "}
                                                  {localTimeString}{" "}
                                                </h4>
                                              </div>
                                            </>
                                          );
                                        })}
                                      </>
                                    )}
                                  </div>

                                  <div className="offerbox">
                                    <div
                                      className="Listingheader"
                                      onClick={handlelistingClick}
                                      style={{ cursor: "pointer" }}
                                    >
                                      <h4>Listings</h4>
                                    </div>
                                    <div
                                      className={`listingdropdown ${
                                        islistingExpanded ? "expanded" : ""
                                      }`}
                                    >
                                      {islistingExpanded && (
                                        <>
                                          <>
                                            {noNftsListings ? (
                                              <>
                                                <div className="noData">
                                                  <h1>No Data</h1>
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <hr />

                                                <div className="detailsContainer">
                                                  <table className="table-container">
                                                    <thead>
                                                      <tr>
                                                        <th>From</th>
                                                        <th>Price</th>

                                                        <th>Expiration</th>
                                                        <th>Quantity</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {listingData.map(
                                                        (data, indexes) => {
                                                          const timestamp =
                                                            data.closing_date;
                                                          const date = new Date(
                                                            timestamp
                                                          );

                                                          // // Get the local date string
                                                          const localDateString =
                                                            date.toLocaleDateString();

                                                          // // Get the local time string
                                                          const localTimeString =
                                                            date.toLocaleTimeString();

                                                          let sellerAddy1 =
                                                            data.maker.address.slice(
                                                              0,
                                                              5
                                                            );
                                                          let sellerAddy2 =
                                                            data.maker.address.slice(
                                                              38
                                                            );
                                                          let ListingPrice;
                                                          let ListingPriceValues;
                                                          let ethh;
                                                          if (
                                                            data.current_price
                                                          ) {
                                                            ListingPrice =
                                                              data.current_price;

                                                            const weiStringValue =
                                                              ListingPrice.toString();
                                                            const etherValue =
                                                              ethers.utils.formatEther(
                                                                weiStringValue
                                                              );

                                                            ListingPriceValues =
                                                              etherValue;
                                                            ethh = "ETH";
                                                          }
                                                          return (
                                                            <>
                                                              <tr>
                                                                <td>
                                                                  {sellerAddy1}
                                                                  ...
                                                                  {sellerAddy2}
                                                                </td>
                                                                <td>
                                                                  {
                                                                    ListingPriceValues
                                                                  }{" "}
                                                                  ETH
                                                                </td>
                                                                <td>
                                                                  {localDateString +
                                                                    " " +
                                                                    localTimeString}
                                                                </td>
                                                                <td>
                                                                  {
                                                                    data.remaining_quantity
                                                                  }
                                                                </td>
                                                              </tr>
                                                            </>
                                                          );
                                                        }
                                                      )}
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </>
                                            )}
                                          </>
                                        </>
                                      )}
                                    </div>
                                  </div>

                                  <div className="d-flex Ender">
                                    <a
                                      href={`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`}
                                    >
                                      <button className="btn btn-primary">
                                        View on OpenSea
                                      </button>
                                    </a>
                                  </div>
                                </div>

                                <div className="offerbox">
                                  <div
                                    className="Listingheader"
                                    onClick={handleOfferClick}
                                    style={{ cursor: "pointer" }}
                                  >
                                    <h4>Activity</h4>
                                  </div>
                                  <div
                                    className={`listingdropdown ${
                                      isOfferExpanded ? "expanded" : ""
                                    }`}
                                  >
                                    {isOfferExpanded && (
                                      <>
                                        <div className="detailsContainer">
                                          <EventsTable events={activityData} />
                                        </div>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <div className="fullPageLoader">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Item;
