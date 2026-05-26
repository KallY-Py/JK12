import { createRouter, createWebHashHistory } from "vue-router";

import YesNo from "../components/YesNo.vue";
import Gift from "../components/Gift.vue";
import PhotoGiftBox from "../components/PhotoGiftBox.vue";
import Message from "../components/Message.vue";
import TulipFlower from "../components/TulipFlower.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: YesNo,
  },
  {
    path: "/gift",
    name: "Gift",
    component: Gift,
  },
  {
    path: "/photo",
    name: "PhotoGiftBox",
    component: PhotoGiftBox,
  },
  {
    path: "/message",
    name: "Message",
    component: Message,
  },
  {
    path: "/tulip",
    name: "TulipFlower",
    component: TulipFlower,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;