import React, { useEffect } from "react";
import DrFooter from "./DrFooter";
import DrHeader from "./DrHeader";
import DrLabLists from "./DrLabLists";
import { CustomToastComponent } from "../../customToast";
import { useDispatch } from "react-redux";
import { FetchDrLab } from "../../store/actions/fetchaction";

const DrLabs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;

    const loadLab = async () => {
      try {
        if (isMounted) {
          dispatch(FetchDrLab());
        }
      } catch (error) {
        console.error("Failed to load lab data:", error);
        // You could dispatch an error action here if needed
      }
    };

    loadLab();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div>
      <DrHeader />

      <main id="main">
        <section className="breadcrumbs">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Lab</h2>
            </div>
          </div>
        </section>

        <DrLabLists />
      </main>

      <DrFooter />

      <a href="#top" className="back-to-top">
        <i className="icofont-simple-up" />
      </a>

      <CustomToastComponent />
    </div>
  );
};

export default DrLabs;
