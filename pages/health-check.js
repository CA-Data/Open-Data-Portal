import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link'
import { spacing, style } from '@mui/system';

export async function getServerSideProps(context) {
  return {
    props: {
      data: context,
    },
  };
}

export default function preview(dataset) {
  return (
    <main id="body-content" class="cagov-main dataset-preview">
      <h1>Health check: Ok</h1>
    </main>
    
  )
}