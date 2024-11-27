import { useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Loader from "./common/Loader";
import LayOut from "./layouts/LayOut";
import Home from "./pages/home/Home";
import About from "./pages/about-us/About";
import Contact from "./pages/contact-us/Contact";
import Account from "./pages/account/Account";
import Cart from "./pages/cart/Cart";
// import Categories from "./pages/categories/Categories";
import Category from "./pages/categories/category/Category";
import Checkout from "./pages/checkout/Checkout";
import Item from "./pages/item/Item";
import { useAppContext } from "./contexts/AppContext";
import ProtectRoute from "./routes/ProtectRoute";
import LayOutAdmin from "./admin/layouts/LayOutAdmin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ListUsers from "./admin/pages/ListUsers";
import ListAuthors from "./admin/pages/ListAuthors";
import ListBooks from "./admin/pages/ListBooks";
import ListCategories from "./admin/pages/ListCategories";
import AddBook from "./admin/forms/Book/AddForm/AddBook";
import EditBook from "./admin/forms/Book/EditForm/EditBook";
import History from "./pages/history/History";
import SearchResult from "./pages/search/SearchResult";
import ListOrders from "./admin/pages/orders/ListOrders";
import OrderPending from "./admin/pages/orders/OrderPending";
import ListTransiting from "./admin/pages/orders/ListTransiting";
import ListDelivered from "./admin/pages/orders/ListDelivered";
import ListCanceled from "./admin/pages/orders/ListCanceled";
import Detail from "./admin/pages/orders/Detail";
import HistoryPending from "./pages/history/HistoryPending";
import HistoryDelivered from "./pages/history/HistoryDelivered";
import HistoryTransit from "./pages/history/HistoryTransit";
import HistoryDetail from "./pages/history/HistoryDetail";
import LayOutCart from "./layouts/LayOutCart";


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { isLogged } = useAppContext();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [])
  return loading ? <Loader /> : (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <LayOut>
              <Home />
            </LayOut>
          } />
          <Route path="/about-us" element={
            <LayOut>
              <About />
            </LayOut>
          } />
          <Route path="/contact" element={
            <LayOut>
              <Contact />
            </LayOut>
          } />
          <Route path="/account" element={
            <LayOut>
              <Account />
            </LayOut>
          } />
          <Route path="/cart" element={
            <LayOutCart>
              <Cart />
            </LayOutCart>
          } />
          {/* <Route path="/categories" element={
            <LayOut>
              <Categories />
            </LayOut>
          } /> */}
          <Route path="/categories/:category" element={
            <LayOut>
              <Category />
            </LayOut>
          } />
          <Route path="/item" element={
            <LayOut>
              <Item />
            </LayOut>
          } />
          <Route path="/search" element={
            <LayOut>
              <SearchResult />
            </LayOut>
          } />
          <Route path="/item/:id" element={
            <LayOut>
              <Item />
            </LayOut>
          } />
          {isLogged && <>
            {/* users */}
            <Route path="/checkout" element={
              <LayOut>
                <Checkout />
              </LayOut>
            } />
            <Route path="/history" element={
              <LayOut>
                <History>
                  <HistoryPending/>
                </History>
              </LayOut>
            } />
             <Route path="/history-order-transiting" element={
              <LayOut>
                <History>
                <HistoryTransit/>
                </History>
              </LayOut>
            } />
             <Route path="/history-order-delivered" element={
              <LayOut>
                <History>
                <HistoryDelivered/>
                </History>
              </LayOut>
            } />
              <Route path="/history-detail/:id" element={
              <LayOut>
                <HistoryDetail/>
              </LayOut>
            } />
            {/* admin */}
            <Route element={<ProtectRoute allowedRoles={["admin"]} />}>
              <Route
                path="/admin"
                element={
                  <LayOutAdmin>
                    <AdminDashboard />
                  </LayOutAdmin>
                }
              />
              <Route
                path="/list-users"
                element={
                  <LayOutAdmin>
                    <ListUsers />
                  </LayOutAdmin>
                }
              />
              <Route
                path="/list-authors"
                element={
                  <LayOutAdmin>
                    <ListAuthors />
                  </LayOutAdmin>
                }
              />
              <Route
                path="/list-books"
                element={
                  <LayOutAdmin>
                    <ListBooks />
                  </LayOutAdmin>
                }
              />
              <Route
                path="/list-categories"
                element={
                  <LayOutAdmin>
                    <ListCategories />
                  </LayOutAdmin>
                }
              />
              <Route
                path="/books/add"
                element={
                  <LayOutAdmin>
                    <AddBook />
                  </LayOutAdmin>
                }
              />
              <Route
                path="/books/edit/:id"
                element={
                  <LayOutAdmin>
                    <EditBook />
                  </LayOutAdmin>
                }
              />
              <Route
                path="/list-orders"
                element={
                  <LayOutAdmin>
                    <ListOrders >
                      <OrderPending />
                    </ListOrders>
                  </LayOutAdmin>
                }
              />
              <Route
                path="/order-transiting"
                element={
                  <LayOutAdmin>
                    <ListOrders >
                      <ListTransiting />
                    </ListOrders>
                  </LayOutAdmin>
                }
              />
              <Route
                path="/order-delivered"
                element={
                  <LayOutAdmin>
                    <ListOrders >
                      <ListDelivered />
                    </ListOrders>
                  </LayOutAdmin>
                }
              />
              <Route
                path="/order-canceled"
                element={
                  <LayOutAdmin>
                    <ListOrders >
                      <ListCanceled />
                    </ListOrders>
                  </LayOutAdmin>
                }
              />
              <Route
                path="/order-detail/:id"
                element={
                  <LayOutAdmin>
                    <Detail />
                  </LayOutAdmin>
                }
              />
            </Route>
          </>}
          <Route path='*' element={<Navigate to='/' />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
