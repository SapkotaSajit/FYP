import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./admin/Dashboard";
import CreateRole from "./pages/Admin/Role/CreateRole";
import RoleList from "./pages/Admin/Role/Index";
import CreateServiceForm from "./pages/Admin/Services/Create";
import AllServices from "./pages/Admin/Services/Index";
import EditRole from "./pages/Admin/Role/editRole";
import EditService from "./pages/Admin/Services/edit";
import AllServicesWithParent from "./pages/Home/Services";
import ServiceDetails from "./pages/Home/ChildServices";
import BookingForm from "./pages/Home/BoookService";
import AllBookings from "./pages/Admin/Bookings";
import AdminPanel from "./pages/Admin/AdminPanel";
import Users from "./pages/Admin/Users/Users";
import HomePage from "./pages/Home/HomePage";
import CreateUser from "./pages/Admin/Users/CreateUser";
import CreateGuide from "./pages/Admin/Guide/Create";
import CreateGuideType from "./pages/Admin/GuideTypes/Create";
import CreateGuideStep from "./pages/Admin/GuideSteps/Create";
import Guide from "./pages/Home/Guide";
import GuideTypes from "./pages/Home/GuideTypes";
import GuideSteps from "./pages/Home/GuideSteps";
import Portfolio from "./pages/Home/Portfolio";
import Contact from "./pages/Home/Contact";
import StaffDashboard from "./pages/Admin/staff/StaffDashboard";
import Staffs from "./pages/Admin/Users/Staffs";
import AllProcessBookings from "./pages/Admin/ProcessBooking";
import AssignedPendingBookingsComponentAdmin from "./pages/Admin/BookingAssignAdmin/AllAssignedPendingbookingAdmin";
import AssignedAcceptedBookingsComponentAdmin from "./pages/Admin/BookingAssignAdmin/AllAssignedAcceptedbookingAdmin";
import AssignedCompletedBookingsComponentAdmin from "./pages/Admin/BookingAssignAdmin/AllAssignedCompletedbookingAdmin";
import AssignedRejectedBookingsComponentAdmin from "./pages/Admin/BookingAssignAdmin/AllAssignedRejectedbookingAdmin";
import AssignedRejectedBookingsComponent from "./pages/Admin/staff/AllAssignedRejectedbookin";
import AssignedAcceptedBookingsComponent from "./pages/Admin/staff/AssignedAcceptedBookingsComponent";
import AssignedCompletedBookingsComponent from "./pages/Admin/staff/AllAssignedCompletedbooking";
import BookingAssignForm from "./pages/Admin/staff/BookingAssignForm";
import AllAssignedbooking from "./pages/Admin/staff/AllAssignedbooking";
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function isAuthenticated() {
  const accessToken = Cookies.get("accessToken");
  return accessToken !== undefined && accessToken !== null;
}

function isAdmin() {
  const roleId = Cookies.get("roleId");
  return roleId === "1";
}
function isStaff() {
  const roleId = Cookies.get("roleId");
  return roleId === "3"; 
}
function PrivateStaffRoute({ element, authenticated, redirectTo }) {
  return authenticated && isStaff() ? element : <Navigate to={redirectTo} />;
}
function PrivateAdminRoute({ element, authenticated, isAdmin, redirectTo }) {
  return authenticated && isAdmin ? element : <Navigate to={redirectTo} />;
}

function PrivateRoute({ element, authenticated, redirectTo }) {
  return authenticated ? element : <Navigate to={redirectTo} />;
}
function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register"}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <PrivateRoute
              element={<Login />}
              authenticated={!isAuthenticated()}
              redirectTo="/admin"
            />
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute
              element={<Register />}
              authenticated={!isAuthenticated()}
              redirectTo="/admin"
            />
          }
        />


        <Route path="/guide" element={<Guide />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/guideType/:guide_id" element={<GuideTypes />} />
        <Route path="/guideStep/:guideTypes_id" element={<GuideSteps />} />
        <Route path="/homeServices" element={<AllServicesWithParent />} />

        <Route path="/childServices/:parentId" element={<ServiceDetails />} />
        <Route path="/booking/:serviceId"
                  element={
                    <PrivateRoute
                      element={<BookingForm/>}
                      authenticated={isAuthenticated()}
                      redirectTo="/login"
                      />
              }
        />
        <Route
          path="/admin"
          element={
            <PrivateAdminRoute
              element={<Dashboard />}
              authenticated={isAuthenticated()}
              isAdmin={isAdmin()}
              redirectTo="/login"
            />
          }
        >
          <Route
            path="createRole"
            element={
              <PrivateAdminRoute
                element={<CreateRole />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="createUser"
            element={
              <PrivateAdminRoute
                element={<CreateUser />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="editRole/:id"
            element={
              <PrivateAdminRoute
                element={<EditRole />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="roles"
            element={
              <PrivateAdminRoute
                element={<RoleList />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
                    <Route
            path="staffs"
            element={
              <PrivateAdminRoute
                element={<Staffs />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="dashboard"
            element={
              <PrivateAdminRoute
                element={<AdminPanel />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="services"
            element={
              <PrivateAdminRoute
                element={<AllServices />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="createService"
            element={
              <PrivateAdminRoute
                element={<CreateServiceForm />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="createGuideTypes"
            element={
              <PrivateAdminRoute
                element={<CreateGuideType />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="createGuideSteps"
            element={
              <PrivateAdminRoute
                element={<CreateGuideStep />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="editService/:id"
            element={
              <PrivateAdminRoute
                element={<EditService />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="createGuide"
            element={
              <PrivateAdminRoute
                element={<CreateGuide />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="bookings"
            element={
              <PrivateAdminRoute
                element={<AllBookings />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
                    <Route
            path="allPen"
            element={
              <PrivateAdminRoute
                element={<AssignedPendingBookingsComponentAdmin/>}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
                              <Route
            path="allAccept"
            element={
              <PrivateAdminRoute
                element={<AssignedAcceptedBookingsComponentAdmin/>}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
                                        <Route
            path="allCompleted"
            element={
              <PrivateAdminRoute
                element={<AssignedCompletedBookingsComponentAdmin/>}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
                              <Route
            path="allReject"
            element={
              <PrivateAdminRoute
                element={<AssignedRejectedBookingsComponentAdmin/>}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
                    <Route
            path="processBookings"
            element={
              <PrivateAdminRoute
                element={<AllProcessBookings />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="createAssignBooking/:bookingId"
            element={
              <PrivateAdminRoute
                element={<BookingAssignForm />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
          <Route
            path="users"
            element={
              <PrivateAdminRoute
                element={<Users />}
                authenticated={isAuthenticated()}
                isAdmin={isAdmin()}
                redirectTo="/login"
              />
            }
          />
        </Route>
        <Route
  path="/staffs"
  element={
    <PrivateStaffRoute
      element={<StaffDashboard />}
      authenticated={isAuthenticated()}
      isStaff={isStaff()}
      redirectTo="/login"
    />
  }
>
  <Route
    path="assignedUsers"
    element={
      <PrivateStaffRoute
        element={<AllAssignedbooking />}
        authenticated={isAuthenticated()}
        isStaff={isStaff()}
        redirectTo="/login"
      />
    }
  />
  <Route
    path="completedAssigned"
    element={
      <PrivateStaffRoute
        element={<AssignedCompletedBookingsComponent/>}
        authenticated={isAuthenticated()}
        isStaff={isStaff()}
        redirectTo="/login"
      />
    }
  />
    <Route
    path="acceptAssigned"
    element={
      <PrivateStaffRoute
        element={<AssignedAcceptedBookingsComponent />}
        authenticated={isAuthenticated()}
        isStaff={isStaff()}
        redirectTo="/login"
      />
    }
  />
      <Route
    path="rejectAssigned"
    element={
      <PrivateStaffRoute
        element={<AssignedRejectedBookingsComponent />}
        authenticated={isAuthenticated()}
        isStaff={isStaff()}
        redirectTo="/login"
      />
    }
  />
</Route>
      </Routes>
    </>
  );
}

export default App;
