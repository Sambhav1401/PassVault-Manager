import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const [show, setShow] = useState(false);
  const passwordRef = useRef(null);
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem('passwords');
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const togglePassword = () => {
    setShow(prev => !prev);
  };

  const savePassword = () => {
    const { site, username, password } = form;
    if (!site.trim() || !username.trim() || !password.trim()) {
      return;
    }

    const newPassword = { ...form, id: uuidv4(), show: false };
    const updatedArray = [...passwordArray, newPassword];
    setpasswordArray(updatedArray);
    localStorage.setItem("passwords", JSON.stringify(updatedArray));
    setform({ site: "", username: "", password: "" });
  };

  const handleDelete = (index) => {
    const updated = passwordArray.filter((_, i) => i !== index);
    setpasswordArray(updated);
    localStorage.setItem("passwords", JSON.stringify(updated));
  };

  const togglePasswordVisibility = (index) => {
    const updated = [...passwordArray];
    updated[index].show = !updated[index].show;
    setpasswordArray(updated);
  };

  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="absolute  inset-0 -z-10 h-full w-full"></div>

      <div className="mt-20 rounded-lg mx-auto max-w-4xl bg-teal-50">
        <div className="hover:cursor-pointer text-2xl font-bold">
          <div className="text-green-700 flex justify-center pt-5">
            <span>&lt;</span> <h1>PassVault</h1><span>/&gt;</span>
          </div>
        </div>

        <h1 className="pt-3 flex justify-center text-xl font-bold p-2">Manage your PassWords</h1>
        <p className="flex justify-center items-center text-xl p-1">Store and secure your passwords</p>

        <div className="flex flex-col p-3 text-black gap-7">
          <input value={form.site} onChange={handlechange} className="border-teal-600 border-2 rounded-md w-full py-1 px-2 text-black hover:border-teal-900" placeholder="Enter Website URL" type="text" name='site' />

          <div className="flex w-full gap-3 justify-between">
            <input value={form.username} onChange={handlechange} className="border-teal-600 border-2 rounded-md py-1 px-2 w-full text-black hover:border-teal-900" placeholder="Enter Username" type="text" name='username' />

            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handlechange}
                className="border-teal-600 border-2 rounded-md py-1 px-2 w-full text-black hover:border-teal-900"
                placeholder="Enter Password"
                type={show ? "password" : "text"}
                name="password"
              />
              <span className="absolute cursor-pointer top-1.5 right-1" onClick={togglePassword}>
                {show ? (
                  <EyeSlashIcon />
                ) : (
                  <EyeIcon />
                )}
              </span>
            </div>
          </div>

          <div onClick={savePassword} className="flex justify-center gap-3 pb-5">
            <button className="bg-teal-500 text-white py-1 px-4 rounded-full hover:bg-teal-600 w-1/4 border-2 border-black hover:border-teal-600">Save</button>
          </div>

          <div className='passwords pb-4'>
            <div className='pb-3 font-bold pl-1'>Your Passwords</div>

            {passwordArray.length === 0 && (
              <div className="text-center text-red-500">No data saved to show!</div>
            )}

            {passwordArray.length !== 0 && (
              <div className="max-h-[15rem] overflow-y-auto">
                <table className="w-full text-sm text-left rtl:text-right text-black">
                  <thead className="text-xs uppercase bg-teal-600 text-black sticky top-0 z-10">
                    <tr>
                      <th className="px-6 py-3">Site</th>
                      <th className="px-6 py-3">Username</th>
                      <th className="px-6 py-3">Password</th>
                      <th className="px-6 py-3">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="bg-teal-200 ">
                    {passwordArray.map((item, index) => (
                      <tr key={item.id} className="border border-gray-300">
                        <td className="px-6 py-4 font-medium whitespace-nowrap">{item.site}</td>
                        <td className="px-6 py-4">{item.username}</td>
                        <td className="px-6 py-4 flex items-center gap-2">
                          <span>{item.show ? "••••••" : item.password}</span>
                          <button onClick={() => togglePasswordVisibility(index)}>
                           {item.show ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <button onClick={() => handleDelete(index)} className="cursor-pointer  text-red-600 hover:text-red-800">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
    <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
</svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const EyeIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M12 5c4.69 0 8.178 4.13 9.544 6.045.304.426.456.639.456.955s-.152.529-.456.955C20.178 14.87 16.69 19 12 19c-4.689 0-8.177-4.13-9.544-6.045C2.152 12.529 2 12.315 2 12s.152-.529.456-.955C3.823 9.13 7.31 5 12 5Z" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const EyeSlashIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} fill="none" viewBox="0 0 24 24">
    <path d="M3 3l18 18M6.5 6.5C4.857 7.835 3.617 9.53 2.956 10.455c-.304.426-.456.639-.456.955s.152.529.456.955C4.323 14.87 7.81 19 12.5 19c1.96 0 3.705-.684 5.212-1.748M17.252 17.252C18.579 16.096 19.617 14.53 20.044 13.955c.304-.426.456-.639.456-.955s-.152-.529-.456-.955C18.677 9.13 15.19 5 10.5 5c-.66 0-1.3.093-1.909.266" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

export default Manager;
