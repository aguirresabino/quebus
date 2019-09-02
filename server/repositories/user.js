module.exports = (api) => {
  const User = api.models.user;
  const genericRepository = api.bin.genericRepository(User);

  const userRepository = {
    save: async (user) => genericRepository.save(user),

    findAll: async () => genericRepository.findAll(),

    findById: async (id) => genericRepository.findById(id),

    findByUsername: async (username) => {
      try {
        const user = await User.findOne({ user: username }).select('+password');
        if (!user) {
          throw new Error('User not found');
        }
        return user;
      } catch (error) {
        throw new Error('User not found');
      }
    },

    update: async (user) => genericRepository.update(user),

    delete: async (id) => genericRepository.delete(id),
  };

  return userRepository;
};
