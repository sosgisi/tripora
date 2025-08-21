import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react"

interface ProviderModalProps {
  setShowProviderModal: Dispatch<SetStateAction<boolean>>;
}

export default function ProviderModal({setShowProviderModal}: ProviderModalProps){

    const router = useRouter();

    const [error, setError] = useState<string|null>(null);
    const [formData, setFormData] = useState({
        companyName: '',
        companyEmail: '',
        companyPhonenumber: '',
        companyLocation: '',
        companyDescription: '',
        companyProfileImage: '',
        companyAddress: '',
        companyCategory: '',
        password: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/admin/provider', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if(!res.ok){
                return setError(data.error);
            }
            router.refresh();
            setShowProviderModal(false)
        } catch (error) {
            console.error('Error submitting form:', error)
        }
    }

    return(
        <>
        <div className="overlay-dark"></div>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 dark:text-white z-40 w-[400px] sm:w-[500px] md:w-1/2 rounded text-xs sm:text-sm text-primary p-5">
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-heading2">Add New Provider</h1>
                <X onClick={() => setShowProviderModal(false)} className="hover:text-gray-500 cursor-pointer transform duration-200"/>
            </div>
            <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                    <label>Company Name</label>
                    <input name="companyName" required placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label>Company Email</label>
                    <input type="email" name="companyEmail" required placeholder="Company Email" value={formData.companyEmail} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label>Company Phone Number</label>
                    <input name="companyPhonenumber" required placeholder="Phone Number" value={formData.companyPhonenumber} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label>Company Location</label>
                    <input name="companyLocation" required placeholder="Location" value={formData.companyLocation} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label>Company Description</label>
                    <textarea name="companyDescription" placeholder="Description" value={formData.companyDescription} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md min-h-16 max-h-52" />
                </div>
                <div>
                    <label>Company Profile Image</label>
                    <input name="companyProfileImage" placeholder="Profile Image URL" value={formData.companyProfileImage} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label>Company Address</label>
                    <input name="companyAddress" placeholder="Address" value={formData.companyAddress} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label>Company Category</label>
                    <input name="companyCategory" placeholder="Category" value={formData.companyCategory} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label>Company Password</label>
                    <input name="password" type="password" required placeholder="Password" value={formData.password} onChange={handleChange} className="outline-none focus:ring ring-blue-500 w-full border p-2 rounded-md" />
                </div>
                <div className="flex justify-between items-center gap-5">
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-400 transform duration-200">Create Provider</button>
                </div>
            </form>
        </div>
        </>
    )
}