import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import { useChainId } from "wagmi";
const Explore = ({ userAddress, HASH }) => {
  const [userNFTdata, setUserNFTdata] = useState([]);
  const [httpsreq, setHttpsreq] = useState("");
  const [displayedArray, setDisplayedArray] = useState([]);
  const chainid = useChainId();

  useEffect(() => {
    if (chainid === 1) {
      setHttpsreq("https://eth-mainnet.g.alchemy.com");
    } else if (chainid === 137) {
      setHttpsreq("https://polygon-mainnet.g.alchemy.com");
    } else if (chainid === 5) {
      setHttpsreq("https://eth-goerli.g.alchemy.com");
    } else if (chainid === 11155111) {
      setHttpsreq("https://eth-sepolia.g.alchemy.com");
    }
  }, [chainid]);
  useEffect(() => {
    async function getter() {
      const options = {
        method: "GET",
        headers: { accept: "application/json" },
      };
      try {
        await fetch(
          `${httpsreq}/v2/qVIMc5ET2Pht7xiaTPgO5gbOcfpCovLm/getNFTsForOwner?owner=${userAddress}&withMetadata=true&pageSize=100`,
          options
        )
          .then((response) => response.json())
          .then((response) => {
            setUserNFTdata(response.ownedNfts);
          })
          .catch((err) => console.error(err));
      } catch (error) {
        // console.log(error);
      }
    }
    getter();
  }, [httpsreq]);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: "GET",
        headers: { accept: "application/json", "X-API-KEY": HASH },
      };
      try {
        const response = await fetch(
          `https://api.simplehash.com/api/v0/nfts/collections/top_v2?chains=ethereum&time_period=30d&limit=100`,
          options
        );
        const data = await response.json();
        // console.log(data);
        setDisplayedArray(data.collections);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="home" id="main-wrapper">
        <br />
        <br />
        <div className="explore section-padding">
          <div className="container">
            <div className="row">
              <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-3">
                <div className="filter-sidebar">
                  <div className="filter-sidebar-content">
                    <h5>Status</h5>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault1"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault1"
                      >
                        Recently Listed
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault2"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault2"
                      >
                        Price: Low to High
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault3"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault3"
                      >
                        Price: High to Low
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="flexCheckDefault4"
                        value=""
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexCheckDefault4"
                      >
                        Alphabetical
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xxl-10 col-xl-9 col-lg-9 col-md-9">
                <div className="row">
                  {displayedArray.map((nftsdata, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className="col-xxl-4 col-xl-4 col-lg-6 col-md-6"
                        >
                          <div className="card items">
                            <div
                              className="card-body"
                              style={{ height: "520px" }}
                            >
                              <div
                                className="items-img position-relative"
                                style={{ height: "330px" }}
                              >
                                <div className="br-Red">
                                  <img
                                    className="img-fluid rounded mb-3"
                                    style={{ height: "100%", width: "100%" }}
                                    src={nftsdata.collection_details.image_url}
                                    alt=""
                                  />
                                </div>
                                <NavLink to="/profile"></NavLink>
                              </div>
                              <NavLink to="/item">
                                <h4 className="card-title"></h4>
                              </NavLink>
                              <p></p>
                              <div className="d-flex justify-content-between">
                                <div className="text-start">
                                  <p className="mb-2">
                                    {nftsdata.collection_details.name}
                                  </p>
                                  <h5 className="text-muted"></h5>
                                </div>
                                <div className="text-end">
                                  <p className="mb-2">
                                    Quantity:{" "}
                                    <strong className="text-primary">
                                      {
                                        nftsdata.collection_details
                                          .total_quantity
                                      }
                                    </strong>
                                  </p>
                                  <h5 className="text-muted"> </h5>
                                </div>
                              </div>
                              {nftsdata.collection_details.marketplace_pages.map(
                                (direction, indy) => {
                                  const serachTerm = "opensea";
                                  if (direction.marketplace_id === serachTerm) {
                                    return (
                                      <div
                                        className="d-flex justify-content-center mt-3"
                                        key={indy}
                                      >
                                        <NavLink
                                          className="btn btn-primary"
                                          to={`/collection/${direction.marketplace_collection_id}`}
                                        >
                                          View Collection
                                        </NavLink>
                                      </div>
                                    );
                                  }
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
