import Layout from '@/components/Layout'
import ListingForm from "@/components/ListingForm"
import React from 'react'

const Create = () => {
  const addHome = async (data) => {
    // Send data as POST request using fetch
    const resp = await (await fetch(`/api/home`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data)
    })).json();
    console.log(resp);
  };

  return (
    <Layout>
      <div className="max-w-screen-sm mx-auto">
        <h1 className="text-xl font-medium text-gray-800">List your home</h1>
        <p className="text-gray-500">
          Fill out the form below to list a new home.
        </p>
        <div className="mt-8">
          <ListingForm
            buttonText="Add home"
            redirectPath="/"
            onSubmit={addHome}
          />
        </div>
      </div>
    </Layout>
  )
}

export default Create
