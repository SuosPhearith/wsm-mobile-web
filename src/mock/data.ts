import {
  CategoryInterface,
  CustomerInterface,
  PopularItemInterface,
  ProductInterface,
  SlideInterface,
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
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/471684856_946928237406782_7028229009191997959_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeFY4UO_e75WB_IU_tJx4jI42Gff6ShSl-bYZ9_pKFKX5jVOjf-3EH6TzotCNV1PJ_2C9WiM_djkiN0fy-K751ph&_nc_ohc=jMvG9sFSursQ7kNvgE2x7SF&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=AsVrLWCTsVecojsowZuShM7&oh=00_AYADBSzZUwaqHgQw6xxeB6jiuHsUuR5d0HQvM-Hki3aKMA&oe=6781305A",
    rate: 4.5,
  },
  {
    id: 2,
    name: "Beef Stew Original",
    description: "about vital 500ml",
    image:
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/471206418_1348959219873265_2383225794468530865_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeHMMLhnTycsSBe9H4ASX8gRikjgl_IwY_2KSOCX8jBj_YqzequN7_6pA-7sBwJYmj8Upme-J5okFIw_ISckDrEW&_nc_ohc=T6mXPIUCiDAQ7kNvgEAlRR2&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=Apx8q_Q9TGdoIB26ObeD8V-&oh=00_AYDb67mL6RGPtlnkoDaM1steH2tuh_6x_66pvW7ogpt-IQ&oe=67811241",
    rate: 4.5,
  },
  {
    id: 3,
    name: "Shrimp Sour Soup",
    description: "about vital 500ml",
    image:
      "https://scontent.fpnh10-1.fna.fbcdn.net/v/t39.30808-6/467732496_876682421331429_8886529821000399565_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeEWGvv-alovx6ZssAu17IqWcQqqK0UIdx5xCqorRQh3Hp1CYE29BnB0lQc1VG8Uv-Yp8FthL87NZXRn9hv4IgoZ&_nc_ohc=llkPmxp1RxEQ7kNvgH49GyV&_nc_zt=23&_nc_ht=scontent.fpnh10-1.fna&_nc_gid=AqL889uRUCF93HpBfBqjoNt&oh=00_AYBHPJhUGMTYZgYCzYmV-wk8wiMuzhrD6i03_RjHH-mxvQ&oe=67812AA1",
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
