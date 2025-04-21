import { useState, useEffect } from "react";
import { Link } from "react-router";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import apiInstance from "../../utils/axios";

function Category() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategory = async () => {
    try {
      const response = await apiInstance.get(`post/category/list/`);

      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Header />
      <section className="bg-light pt-5 pb-5 mb-3 mt-3">
        <div className="container">
          <div className="row g-0">
            <div className="col-12 ">
              <div className="mb-4">
                <h2>Categories</h2>
              </div>

              <div className="container py-4">
                <div className="row g-4">
                  {category?.map((c, index) => (
                    <div className="col-md-4 col-lg-2" key={index}>
                      <Link
                        to={`/category/${c.slug}`}
                        className="text-decoration-none"
                      >
                        <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden hover-scale">
                          <div className="position-relative">
                            <img
                              className="card-img-top"
                              src={c.image}
                              style={{ height: "120px", objectFit: "cover" }}
                              alt={c.title}
                            />
                            <div className="category-overlay"></div>
                          </div>
                          <div className="card-body text-center py-3">
                            <h5 className="card-title fw-bold mb-1">
                              {c.title}
                            </h5>
                            <p className="card-text text-muted small">
                              {c.post_count} Articles
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Category;
