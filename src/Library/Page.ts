import { createSignal } from "solid-js";

import { db } from "~Database";
import { router } from "~Services/Router";

import { navigation } from "../Navigation";

export function loadPages() {
  const [resume, setResume] = createSignal(false);

  const link = getCurrentLink();
  if (link === undefined) {
    return;
  }

  addLink(link).then(() => {
    setResume(true);
    for (const category of Object.keys(navigation)) {
      for (const item of navigation[category]) {
        for (const link of item.links) {
          addLink(link);
        }
      }
    }
  });

  return resume;
}

function getCurrentLink(): any {
  for (const category of Object.keys(navigation)) {
    for (const item of navigation[category]) {
      for (const link of item.links) {
        if (link.href === router.history.location.pathname) {
          return link;
        }
      }
    }
  }
}

async function addLink(link: any) {
  const page = await getRemotePage(link.file);
  const current = await db.docs.findOne({ path: link.href });
  if (current !== undefined) {
    if (current.body !== page) {
      await db.docs.updateOne({ path: link.href }, { $set: { body: page } });
    }
  } else {
    await db.docs.insertOne({
      path: link.href,
      body: page
    });
  }
}

async function getRemotePage(url: string) {
  return fetch(url).then((res) => {
    if (res.status === 200) {
      return res.text();
    }
    return "Working on it, check back later ...";
  });
}
