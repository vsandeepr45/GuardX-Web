import React, { useEffect, useMemo, useState } from "react";

import {
  getHelpGuides,
  getHelpGuideCategories,
  getHelpGuide,
} from "../api/helpdeskApi";

import { useAuth } from "../context/AuthContext";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  Search,
  BookOpen,
  ChevronRight,
  X,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

import "../styles/HelpGuides.css";


function HelpGuides() {

  const { user } = useAuth();

  const [guides, setGuides] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedGuide, setSelectedGuide] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(true);
  const [guideLoading, setGuideLoading] = useState(false);

  const [error, setError] = useState("");


  // ========================================================
  // LOAD INITIAL DATA
  // ========================================================

  useEffect(() => {
    loadCategories();
    loadGuides();
  }, []);


  // ========================================================
  // LOAD CATEGORIES
  // ========================================================

  async function loadCategories() {

    try {

      setError("");

      const response = await getHelpGuideCategories();

      setCategories(
        response.data?.data || []
      );

    } catch (err) {

      console.error(
        "Help guide category error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load Help & Guide categories."
      );
    }
  }


  // ========================================================
  // LOAD GUIDES
  // ========================================================

  async function loadGuides(customParams = null) {

    try {

      setLoading(true);
      setError("");

      const params = customParams || {};

      const response = await getHelpGuides(params);

      setGuides(
        response.data?.data || []
      );

    } catch (err) {

      console.error(
        "Help guide loading error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load Help & Guide articles."
      );

    } finally {

      setLoading(false);
    }
  }


  // ========================================================
  // SEARCH
  // ========================================================

  function handleSearch() {

    loadGuides({
      search: search.trim(),
      category: category
    });

  }


  // ========================================================
  // CATEGORY FILTER
  // ========================================================

  function handleCategoryChange(value) {

    setCategory(value);

    loadGuides({
      search: search.trim(),
      category: value
    });

  }


  // ========================================================
  // OPEN GUIDE
  // ========================================================

  async function openGuide(slug) {

    try {

      setGuideLoading(true);
      setError("");

      const response =
        await getHelpGuide(slug);

      setSelectedGuide(
        response.data?.data || null
      );

    } catch (err) {

      console.error(
        "Help guide details error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load this guide."
      );

    } finally {

      setGuideLoading(false);
    }
  }


  // ========================================================
  // REFRESH
  // ========================================================

  function refreshGuides() {

    loadGuides({
      search: search.trim(),
      category
    });

  }


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <DashboardLayout>

      <div className="help-guides-page">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="help-guides-header">

          <div>

            <div className="help-guides-title">

              <BookOpen size={28} />

              <h1>
                Help & Guides
              </h1>

            </div>

            <p>
              Learn how to use GuardX and resolve
              common operational issues.
            </p>

          </div>


          <button
            className="help-guides-refresh"
            onClick={refreshGuides}
            disabled={loading}
          >

            <RefreshCw size={17} />

            Refresh

          </button>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div className="help-guides-alert">

            <AlertTriangle size={18} />

            <span>
              {error}
            </span>

            <button
              onClick={() => setError("")}
            >
              <X size={16} />
            </button>

          </div>

        )}


        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="help-guides-filters">

          <div className="help-guides-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search guides..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {

                if (e.key === "Enter") {
                  handleSearch();
                }

              }}
            />

          </div>


          <select
            value={category}
            onChange={(e) =>
              handleCategoryChange(
                e.target.value
              )
            }
          >

            <option value="">
              All Categories
            </option>

            {categories.map((item) => (

              <option
                key={item.id}
                value={item.category_slug}
              >
                {item.category_name}
              </option>

            ))}

          </select>


          <button
            className="help-guides-search-btn"
            onClick={handleSearch}
          >
            Search
          </button>

        </div>


        {/* ==================================================
            GUIDE LIST
        ================================================== */}

        <div className="help-guides-content">

          {loading ? (

            <div className="help-guides-loading">
              Loading Help & Guides...
            </div>

          ) : guides.length === 0 ? (

            <div className="help-guides-empty">

              <BookOpen size={42} />

              <h3>
                No guides found
              </h3>

              <p>
                There are no Help & Guide articles
                available for your account.
              </p>

            </div>

          ) : (

            <div className="help-guides-grid">

              {guides.map((guide) => (

                <button
                  key={guide.id}
                  className="help-guide-card"
                  onClick={() =>
                    openGuide(guide.slug)
                  }
                >

                  <div className="help-guide-icon">
                    <BookOpen size={22} />
                  </div>


                  <div className="help-guide-card-content">

                    <span className="help-guide-category">
                      {guide.category_name}
                    </span>

                    <h3>
                      {guide.title}
                    </h3>

                    <p>
                      {guide.summary || ""}
                    </p>

                  </div>


                  <ChevronRight
                    size={20}
                  />

                </button>

              ))}

            </div>

          )}

        </div>


        {/* ==================================================
            GUIDE DETAILS
        ================================================== */}

        {selectedGuide && (

          <div className="help-guides-modal-overlay">

            <div className="help-guides-modal">

              <div className="help-guides-modal-header">

                <div>

                  <span>
                    {selectedGuide.category_name}
                  </span>

                  <h2>
                    {selectedGuide.title}
                  </h2>

                </div>


                <button
                  onClick={() =>
                    setSelectedGuide(null)
                  }
                >
                  <X size={21} />
                </button>

              </div>


              <div className="help-guides-modal-body">

                {guideLoading ? (

                  <div>
                    Loading guide...
                  </div>

                ) : (

                  <div
                    className="help-guide-content"
                    dangerouslySetInnerHTML={{
                      __html:
                        selectedGuide.content || ""
                    }}
                  />

                )}

              </div>

            </div>

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}


export default HelpGuides;