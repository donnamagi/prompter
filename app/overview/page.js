"use client"

import { React, useContext } from 'react';
import { StateContext } from 'app/state-provider';
import Overview from "@/components/Overview";

export default function Page() {
  const {template} = useContext(StateContext);
  return <Overview template={template} />
}
