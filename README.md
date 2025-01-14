# **Barbershop Appointment Management System**

This is a web application designed to manage appointments for a barbershop. The platform allows clients to view available barbers, schedule appointments, and explore the most popular services. It also features various analytics tools for administrators, such as top-performing barbers and busiest days. The application is built with a modern tech stack and a robust relational database.

---

## **Features**

### **Client Features**
- **Appointment Scheduling:**
  - Clients can select a barber, date, time, and desired services for their appointments.
  - Services are categorized for easy selection (e.g., Haircut, Beard Trim, Hair Treatment).
  
- **View Appointments:**
  - Clients can view their scheduled appointments along with details like date, time, barber name, and selected services.

### **Admin Features**
- **Top Analytics:**
  - **Top 3 Clients:** See the most active clients based on the total number of appointments.
  - **Top 3 Services:** Displays the most booked services, grouped by category.
  - **Top 3 Barbers:** Lists the barbers with the most appointments.
  - **Top 3 Days:** Shows the dates with the highest number of appointments.

- **Barber Management:**
  - Admins can add, update, or delete barbers directly from the platform.

- **Service Management:**
  - Easily manage service categories and pricing.

### **Dynamic Navigation**
- Responsive navbar with links to **Home**, **Barbers**, **Appointments**, and **Contact** pages.

### **User Authentication**
- **Signup/Login:** Secure client account creation and login system with bcrypt-based password hashing.
- **Role Management:** Differentiates between `client` and `admin` users.

---

## **Database Structure**
The application is backed by a MySQL relational database with the following tables:
1. **Clients:** Stores client information, including hashed passwords.
2. **Barbers:** Linked to `Clients` for admin-role users who act as barbers.
3. **Appointments:** Tracks client bookings, linked to barbers and services.
4. **Services:** Includes service details and their associated categories.
5. **Categories:** Defines service categories (e.g., Haircut, Beard Trim).

**Key Relationships:**
- `Appointments` links to `Clients`, `Barbers`, and `Services`.
- `Services` links to `Categories`.

---

## **Technologies Used**
### **Frontend**
- **React.js:** Built with components for modularity and efficiency.
- **CSS:** Fully customized styles for an engaging UI/UX.
- **Responsive Design:** Ensures compatibility across devices.

### **Backend**
- **Node.js with Express.js:** Provides API endpoints for communication with the database.
- **MySQL:** Relational database used for structured data storage and complex queries.

---

## **Endpoints Overview**
### **Interogări Simple (JOINs)**
1. Retrieve all appointments for a specific client.
2. List all services along with their categories.
3. Show most frequent clients based on appointment count.
4. Display top services and their respective categories.
5. Highlight top-performing barbers.
6. Summarize barber performance statistics.

### **Interogări Complexe (Subqueries)**
1. Find top clients with the most appointments, using subqueries for detailed filtering.
2. Identify the top 3 barbers based on their appointment count, refined via subqueries.
3. List the top 3 services by category with subqueries for service-specific statistics.
4. Highlight the top 3 days with the highest appointment count, calculated using nested queries.

---

## **How to Run Locally**
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/username/barbershop-appointment-system.git
   cd barbershop-appointment-system
   ```

2. **Set Up the Backend:**
   - Install dependencies:
     ```bash
     cd backend
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```

3. **Set Up the Frontend:**
   - Install dependencies:
     ```bash
     cd frontend
     npm install
     ```
   - Start the React app:
     ```bash
     npm start
     ```

4. **Database Setup:**
   - Import the provided `signup.sql` schema into your MySQL database.
   - Update the database connection settings in `server.js`.

---

## **Future Improvements**
- Add a payment system for bookings.
- Integrate a calendar view for appointments.
- Implement real-time notifications for reminders.

---
