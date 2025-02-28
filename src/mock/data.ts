import {
  CategoryInterface,
  CustomerInterface,
  dateInterface,
  PopularItemInterface,
  ProductInterface,
  SlideInterface,
  TimeSlotInterface,
  TodoInterface,
} from "./type";

export const sliders: SlideInterface[] = [
  {
    id: 1,
    image:
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/471986341_948089687290637_1558482942362160663_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFF6b__Dcv1OtVzCmLCudttsey6x1IpZDux7LrHUilkO9Q5-IOfBl1fBZvBwSBHQV0QjdcXRgcqWycuCaQCBslA&_nc_ohc=5SyCv6R4d60Q7kNvgEE6tRW&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=AmIDSLNu_D5AxV2Zp-iJa8F&oh=00_AYBUbM_w1ySOWVvYxz7IG53YaH75ip4l8cng7VcGEjPC4w&oe=678131FA",
  },
  {
    id: 2,
    image:
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/472007128_948089577290648_5015593409227676828_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeEOjHDHsUTqpNW8t6cCcTmixmi5hlBX1m_GaLmGUFfWb-2znD3kfVvSWXYZAovTIBPwre0J48Z0BGm63veVeJuC&_nc_ohc=iE1QTKLfqEgQ7kNvgGavi9i&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=A1gjmpSjbDCqAlTtnsjS0RX&oh=00_AYCFy-jfnby3xh6Ku_3br2a7TvtHJlrKK1N6Mheo4XqGgg&oe=6781037B",
  },
  {
    id: 3,
    image:
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/472052157_947210420711897_2535470159410894657_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHz7QNNKuVycipUxub-uMAtU7bg-m2OagpTtuD6bY5qCoK5ynsRN8nMtl5_X4of0cxvJUbrcj1pn2l-CJ4zG4Y2&_nc_ohc=RpPVBR0q11oQ7kNvgGp8ffx&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=Al4Wq1VP0TIVbTKUxF7c-MO&oh=00_AYA-7vqybKbxiFYMqG822_0i_-5hkwBxg-vIV-u-wxzpvw&oe=678133B7",
  },
];

export const categories: CategoryInterface[] = [
  {
    id: 1,
    name: "Water",
    image: "https://cdn-icons-png.flaticon.com/128/824/824239.png",
  },
  {
    id: 2,
    name: "Noodle",
    image: "https://cdn-icons-png.flaticon.com/128/3041/3041130.png",
  },
  {
    id: 3,
    name: "Fruits",
    image: "https://cdn-icons-png.flaticon.com/128/1625/1625048.png",
  },
  {
    id: 4,
    name: "Snacks",
    image: "https://cdn-icons-png.flaticon.com/128/2553/2553691.png",
  },
  {
    id: 5,
    name: "Juice",
    image: "https://cdn-icons-png.flaticon.com/128/1687/1687077.png",
  },
  {
    id: 6,
    name: "Vegetables",
    image: "https://cdn-icons-png.flaticon.com/128/2153/2153786.png",
  },
  {
    id: 7,
    name: "Dairy",
    image: "https://cdn-icons-png.flaticon.com/128/8081/8081382.png",
  },
  {
    id: 8,
    name: "Bakery",
    image: "https://cdn-icons-png.flaticon.com/128/3081/3081967.png",
  },
];

export const popularItems: PopularItemInterface[] = [
  {
    id: 1,
    name: "Vital 500ml",
    description: "about vital 500ml",
    image:
      "https://i.pinimg.com/736x/2e/3d/68/2e3d6845011de0d24c13dd1e1028a2ff.jpg",
    rate: 4.5,
  },
  {
    id: 2,
    name: "Beef Stew Original",
    description: "about vital 500ml",
    image:
      "https://i.pinimg.com/736x/70/22/fd/7022fde301338644bca180ebce7d51a7.jpg",
    rate: 4.5,
  },
  {
    id: 3,
    name: "Shrimp Sour Soup",
    description: "about vital 500ml",
    image:
      "https://i.pinimg.com/736x/09/e5/cb/09e5cb125194e8316a70ab1ee5d260c0.jpg",
    rate: 4.5,
  },
];

export const todos: TodoInterface[] = [
  {
    id: 1,
    name: "Aeon Mall Phnom Penh",
    description: "Buy weekly groceries",
    priority: "High",
    status: "Pending",
    type: "Drop",
    latitude: 11.5466,
    longitude: 104.9318,
    assigned_by: "Sok Chea",
    time_slot: "9:00 AM - 10:00 AM",
  },
  {
    id: 2,
    name: "Chip Mong 271 Mega Mall",
    description: "Review PR for team project",
    priority: "Medium",
    status: "In Progress",
    type: "Delivery",
    latitude: 11.5375,
    longitude: 104.9044,
    assigned_by: "Srey Pich",
    time_slot: "11:00 AM - 12:00 PM",
  },
  {
    id: 3,
    name: "Lucky Supermarket Toul Kork",
    description: "Attend evening gym session",
    priority: "Low",
    status: "Completed",
    type: "Delivery",
    latitude: 11.5684,
    longitude: 104.9018,
    assigned_by: "Trainer Visal",
    time_slot: "6:00 PM - 7:00 PM",
  },
  {
    id: 4,
    name: "Makro Cambodia",
    description: "Weekly sprint planning",
    priority: "High",
    status: "Completed",
    type: "Sale",
    latitude: 11.5825,
    longitude: 104.8545,
    assigned_by: "Manager Dara",
    time_slot: "2:00 PM - 3:00 PM",
  },
  {
    id: 5,
    name: "Bayon Market",
    description: "Annual health checkup",
    priority: "Medium",
    status: "Pending",
    type: "Delivery",
    latitude: 11.5529,
    longitude: 104.9214,
    assigned_by: "Clinic Reception",
    time_slot: "10:00 AM - 11:00 AM",
  },
  {
    id: 6,
    name: "Aeon Mall Sen Sok",
    description: "Finish reading a new novel",
    priority: "Low",
    status: "In Progress",
    type: "Drop",
    latitude: 11.5892,
    longitude: 104.8908,
    assigned_by: "Library Assistant",
    time_slot: "8:00 PM - 9:00 PM",
  },
  {
    id: 7,
    name: "Thai Huot Market",
    description: "Resolve login issue in app",
    priority: "High",
    status: "In Progress",
    type: "Delivery",
    latitude: 11.5656,
    longitude: 104.8888,
    assigned_by: "Tech Lead Sokha",
    time_slot: "3:00 PM - 4:00 PM",
  },
  {
    id: 8,
    name: "Super Duper Market",
    description: "Plant flowers in backyard",
    priority: "Medium",
    status: "Completed",
    type: "Sale",
    latitude: 11.5538,
    longitude: 104.9234,
    assigned_by: "Gardener Rith",
    time_slot: "7:00 AM - 8:00 AM",
  },
  {
    id: 9,
    name: "Bayon Supermarket Chroy Changva",
    description: "Prepare slides for conference",
    priority: "High",
    status: "Pending",
    type: "Sale",
    latitude: 11.6078,
    longitude: 104.9336,
    assigned_by: "Team Leader Chan",
    time_slot: "1:00 PM - 2:00 PM",
  },
  {
    id: 10,
    name: "Lucky Supermarket BKK",
    description: "Watch a trending new movie",
    priority: "Low",
    status: "Completed",
    type: "Drop",
    latitude: 11.5521,
    longitude: 104.9273,
    assigned_by: "Friend Mony",
    time_slot: "9:00 PM - 11:00 PM",
  },
  {
    id: 11,
    name: "Lucky Supermarket SR",
    description: "Watch a trending new movie",
    priority: "Low",
    status: "Pending",
    type: "Delivery",
    latitude: 13.666926745261566,
    longitude: 104.30732301774049,
    assigned_by: "Friend Mony",
    time_slot: "9:00 PM - 11:00 PM",
  },
];

export const products: ProductInterface[] = [
  {
    id: 1,
    name: "Vital 500ml",
    price: 4.9,
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
  },
  {
    id: 2,
    name: "Vital 330ml",
    price: 5.9,
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
  },
  {
    id: 3,
    name: "Vital 250ml",
    price: 2.2,
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
  },
  {
    id: 4,
    name: "Vital 1.5l",
    price: 4.3,
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
  },
];

export const customers: CustomerInterface[] = [
  {
    id: "1",
    name: "John Doe",
    phone: "1234567890",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "New York",
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "9876543210",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "Los Angeles",
  },
  {
    id: "3",
    name: "Alice Johnson",
    phone: "5551234567",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "Chicago",
  },
  {
    id: "4",
    name: "Bob Williams",
    phone: "4440001111",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "Houston",
  },
  {
    id: "5",
    name: "Emily Davis",
    phone: "3332224444",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "Phoenix",
  },
  {
    id: "6",
    name: "Michael Brown",
    phone: "7778889999",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "Philadelphia",
  },
  {
    id: "7",
    name: "Sophia Miller",
    phone: "2223334444",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "San Antonio",
  },
  {
    id: "8",
    name: "Daniel Wilson",
    phone: "1112223333",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "San Diego",
  },
  {
    id: "9",
    name: "Olivia Taylor",
    phone: "9990001111",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "Dallas",
  },
  {
    id: "10",
    name: "James Anderson",
    phone: "1231231234",
    image:
      "https://imgs.search.brave.com/H-L3dkZGwV7TR9V_pEy9AdO5-Cb-MqAk9cazft0zUOw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZWJi/bGVseS5jb20vY2F0/ZWdvcmllcy9jYW5k/bGUvY2FuZGxlLXB1/cnBsZS1sYXZlbmRl/ci5qcGc_d2lkdGg9/NzIwJnF1YWxpdHk9/NzU",
    location: "San Jose",
  },
];

export const dates: dateInterface[] = [
  { date: "10-01-2025" },
  { date: "11-01-2025" },
  { date: "12-01-2025" },
  { date: "13-01-2025" },
  { date: "14-01-2025" },
  { date: "15-01-2025" },
  { date: "16-01-2025" },
  { date: "17-01-2025" },
  { date: "18-01-2025" },
  { date: "19-01-2025" },
  { date: "20-01-2025" },
  { date: "21-01-2025" },
  { date: "22-01-2025" },
  { date: "23-01-2025" },
  { date: "24-01-2025" },
];

export const timeSlots: TimeSlotInterface[] = [
  { time: "Morning (09:00 - 12:00)" },
  { time: "Afternoon (12:00 - 16:00)" },
  { time: "Evening (16:00 - 20:00)" },
];
