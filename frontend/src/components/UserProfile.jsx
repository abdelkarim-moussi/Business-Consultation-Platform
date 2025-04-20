import { useState } from 'react';

const UserProfile = ({ user }) => {
  const [formData, setFormData] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [photo, setPhoto] = useState(user.photo);
  const [photoFile, setPhotoFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files.length > 0) {
      setPhotoFile(e.target.files[0]);
      setPhoto(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Handle password change
  };

  const memberSince = new Date(user.created_at);
  const formattedDate = `Membre depuis ${memberSince.getFullYear()}, le mois ${(memberSince.getMonth() + 1).toString().padStart(2, '0')}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        {/* Profile Photo */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6" style={{ backgroundColor: '#D9E0A4' }}>
            <div className="text-center">
              <img 
                className="h-32 w-32 rounded-full mx-auto border-4" 
                style={{ borderColor: '#19485F' }}
                src={photo ? `storage/${photo}` : '/default-profile.png'} 
                alt="Photo de profil"
              />
              <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-4">
                <label 
                  htmlFor="updated-photo" 
                  className="cursor-pointer px-4 py-1 mr-2 rounded-lg transition text-sm"
                  style={{ backgroundColor: '#19485F', color: 'white' }}
                >
                  Modifier la Photo
                </label>
                <input 
                  className="hidden" 
                  type="file" 
                  name="updated-photo" 
                  id="updated-photo" 
                  onChange={handlePhotoChange}
                />
                {photoFile && (
                  <button 
                    type="submit" 
                    className="px-4 py-0.5 rounded-lg transition text-sm ml-2"
                    style={{ backgroundColor: '#19485F', color: 'white' }}
                  >
                    Enregistrer
                  </button>
                )}
              </form>
            </div>
            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="text-center">
                <h3 className="text-lg font-medium" style={{ color: '#19485F' }}>
                  {`${user.firstname} ${user.lastname}`}
                </h3>
                <p className="text-sm text-gray-600">{formattedDate}</p>
                <p className="text-sm mt-2 px-2 py-1 rounded-full inline-block" style={{ backgroundColor: '#19485F', color: '#D9E0A4' }}>
                  {user.account_type}
                </p>
              </div>
              {user.account_type !== 'admin' && (
                <div className="mt-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Note moyenne</span>
                    <span className="font-medium">
                      <i className="fas fa-star mr-1" style={{ color: '#19485F' }}></i>
                      {avgnote}
                    </span>
                  </div>
                  {user.account_type === 'driver' && (
                    <>
                      <div className="flex justify-between text-sm mt-3">
                        <span className="text-gray-600">Courses effectuées</span>
                        <span className="font-medium">{numcourses}</span>
                      </div>
                      <div className="flex items-center space-x-4 my-2">
                        <span className="text-sm text-gray-600">Status:</span>
                        <a 
                          href={`profile/updateDriverStatus/${driver.status}`} 
                          className="capitalize px-4 py-1 rounded-lg transition text-sm"
                          style={{ backgroundColor: '#19485F', color: 'white' }}
                        >  
                          {driver.status}
                        </a>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium mb-6" style={{ color: '#19485F' }}>Informations personnelles</h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input
                      type="text"
                      name="firstname"
                      id="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                      style={{ focusRingColor: '#19485F' }}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                      type="text"
                      name="lastname"
                      id="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                      style={{ focusRingColor: '#19485F' }}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Adresse email</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                      style={{ focusRingColor: '#19485F' }}
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Numéro de téléphone</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                      style={{ focusRingColor: '#19485F' }}
                    />
                  </div>

                  {user.account_type === 'driver' && (
                    <div className="col-span-6">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ville</label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                        style={{ focusRingColor: '#19485F' }}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg transition text-sm"
                    style={{ backgroundColor: '#19485F', color: 'white' }}
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white shadow rounded-lg mt-6">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium mb-6" style={{ color: '#19485F' }}>Sécurité</h3>
              <form onSubmit={handlePasswordSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Mot de passe actuel</label>
                    <input
                      type="password"
                      name="currentPassword"
                      id="current-password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                      style={{ focusRingColor: '#19485F' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">Nouveau mot de passe</label>
                    <input
                      type="password"
                      name="newPassword"
                      id="new-password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                      style={{ focusRingColor: '#19485F' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirmer le nouveau mot de passe</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirm-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-offset-2 sm:text-sm"
                      style={{ focusRingColor: '#19485F' }}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg transition text-sm"
                    style={{ backgroundColor: '#19485F', color: 'white' }}
                  >
                    Changer le mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;