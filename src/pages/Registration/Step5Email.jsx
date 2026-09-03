import { useState } from "react";
import axios from "axios";
import {
    AlertCircle,
    Trash2
} from "lucide-react";

import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

const API_URL =
    process.env.REACT_APP_API_URL ||
    "http://localhost:5200";


const Step5Email = ({
    data,
    setData,
    nextStep,
    prevStep
}) => {


    const [emailPages, setEmailPages] = useState(
        data.emailPages || []
    );


    const [newEmail, setNewEmail] =
        useState("");

    const [pageCount, setPageCount] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);



    const maxEmails =
        data.selectedPlan?.features
            ?.find(item =>
                item.includes("Email")
            )
            ?.match(/\d+/)?.[0] || 1;



    // ==========================
    // Add Email
    // ==========================

    const handleAddEmailPage = async () => {

        try {

            setError("");

            if (!newEmail.trim()) {
                setError(
                    "Business email required"
                );
                return;
            }


            if (!pageCount) {
                setError(
                    "Please enter page count"
                );
                return;
            }



            if (
                emailPages.length >=
                Number(maxEmails)
            ) {

                setError(
                    `Maximum ${maxEmails} emails allowed`
                );

                return;
            }



            const token =
                localStorage.getItem(
                    "token"
                );



            setLoading(true);



            const response =
                await axios.post(

                    `${API_URL}/api/email`,

                    {
                        email:
                            newEmail
                                .trim()
                                .toLowerCase(),

                        pageCount:
                            Number(pageCount)
                    },


                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );



            if (response.data.success) {


                const created =
                    response.data.page;



                setEmailPages(prev => [
                    ...prev,
                    created
                ]);


                setNewEmail("");

                setPageCount("");

            }
            else {

                setError(
                    response.data.message
                );

            }


        }
        catch (err) {

            console.log(err);


            setError(
                err.response?.data?.message ||
                "Email creation failed"
            );

        }
        finally {

            setLoading(false);

        }

    };






    // ==========================
    // Delete Email
    // ==========================


    const handleDeleteEmailPage =
        async (id) => {


            try {


                const token =
                    localStorage.getItem(
                        "token"
                    );



                await axios.delete(

                    `${API_URL}/api/email/${id}`,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }

                );



                setEmailPages(prev =>

                    prev.filter(
                        item =>
                            item.id !== id &&
                            item._id !== id
                    )

                );



            }
            catch (err) {

                console.log(err);


                setError(
                    err.response?.data?.message ||
                    "Delete failed"
                );

            }

        };







    // ==========================
    // Continue
    // ==========================


    const handleStepSubmit = (e) => {


        e.preventDefault();


        if (emailPages.length === 0) {

            setError(
                "Add minimum one business email"
            );

            return;

        }



        setData(prev => ({

            ...prev,

            emailPages

        }));



        nextStep();

    };






    return (

        <form
            onSubmit={handleStepSubmit}
            className="space-y-6"
        >


            <h2 className="text-2xl font-bold">
                Configure Business Email
            </h2>


            <p className="text-gray-500">

                {
                    emailPages.length
                }
                /
                {
                    maxEmails
                }
                Emails Created

            </p>



            {
                error &&

                <div className="
p-4
bg-red-50
border
border-red-200
rounded-lg
flex
gap-3
">

                    <AlertCircle
                        className="text-red-600"
                    />

                    <p className="text-red-600">
                        {error}
                    </p>


                </div>

            }





            <div>

                <Label>
                    Business Email
                </Label>


                <Input

                    type="email"

                    value={newEmail}

                    onChange={
                        e => setNewEmail(
                            e.target.value
                        )
                    }

                    placeholder="
info@example.com
"

                />

            </div>






            <div>

                <Label>
                    Number of Pages
                </Label>


                <Input

                    type="number"

                    min="1"

                    max="20"

                    value={pageCount}

                    onChange={
                        e => setPageCount(
                            e.target.value
                        )
                    }

                />


            </div>






            <Button

                type="button"

                onClick={handleAddEmailPage}

                disabled={loading}

                className="
w-full
bg-blue-600
text-white
"

            >

                {
                    loading
                        ?
                        "Adding..."
                        :
                        "Add Email"
                }

            </Button>






            {
                emailPages.length > 0 &&

                <div className="space-y-3">


                    <h3 className="font-semibold">
                        Created Emails
                    </h3>



                    {
                        emailPages.map(page => (


                            <div

                                key={
                                    page.id ||
                                    page._id
                                }

                                className="
flex
justify-between
items-center
border
rounded-xl
p-4
"


                            >


                                <div>

                                    <p className="font-medium">

                                        {
                                            page.email
                                        }

                                    </p>


                                    <p className="text-sm text-gray-500">

                                        Pages:
                                        {
                                            page.pageCount ||
                                            page.page_name
                                        }

                                    </p>


                                </div>



                                <Button

                                    type="button"

                                    variant="ghost"

                                    onClick={() => handleDeleteEmailPage(
                                        page.id ||
                                        page._id
                                    )}

                                >

                                    <Trash2
                                        className="
text-red-500
"
                                    />


                                </Button>



                            </div>



                        ))
                    }



                </div>

            }





            <div className="
flex
justify-between
pt-6
">


                <Button

                    type="button"

                    variant="outline"

                    onClick={prevStep}

                >

                    Back

                </Button>




                <Button

                    type="submit"

                    disabled={
                        emailPages.length === 0
                    }

                    className="
bg-blue-600
text-white
"

                >

                    Continue

                </Button>



            </div>


        </form>


    );


};


export default Step5Email;