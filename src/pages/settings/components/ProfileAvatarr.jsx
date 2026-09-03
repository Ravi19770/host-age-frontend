import { Camera } from "lucide-react";

const ProfileAvatarr = ({ image, setImage }) => {
  const handleImage = (e) => {
    if (e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex items-center gap-6">

      <div className="h-24 w-24 overflow-hidden rounded-full border">

        <img
          src={image || "https://placehold.co/150x150"}
          alt="avatar"
          className="h-full w-full object-cover"
        />

      </div>

      <label className="cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700">

        <Camera size={18} className="inline mr-2" />

        Change Photo

        <input
          hidden
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

      </label>
    </div>
  );
};

export default ProfileAvatarr;